// الفصل الثاني: عملية بناء Flutter: من Dart إلى Native
export function getChapter2ContentArabic() {
  return {
    id: 2,
    partId: 1,
    title: "عملية بناء Flutter: من Dart إلى Native",
    sections: [
      "نظرة عامة على خط أنابيب التجميع",
      "تجميع Dart إلى Native",
      "عملية بناء Android و Gradle",
      "عملية بناء iOS وتكامل Xcode"
    ],
    readTime: "30 دقيقة",
    content: `
# الفصل الثاني: عملية بناء Flutter: من Dart إلى Native

فهم كيف يحول Flutter كود Dart الخاص بك إلى تطبيقات native أمر بالغ الأهمية لتحسين أوقات البناء، واستكشاف مشاكل النشر، واتخاذ قرارات معمارية مدروسة. سيأخذك هذا الفصل عبر خط أنابيب التجميع بالكامل، من كود المصدر الخاص بك إلى الملفات التنفيذية native النهائية التي تعمل على الأجهزة.

## 2.1 نظرة عامة على خط أنابيب التجميع

تختلف عملية تجميع Flutter بشكل كبير بين builds التطوير والإنتاج، وبين منصات الهدف المختلفة. يستخدم الإطار استراتيجيات تجميع مختلفة للتحسين لسرعة التطوير أثناء التصحيح وأداء وقت التشغيل في الإنتاج.

### builds التطوير مقابل الإنتاج

**builds التطوير (Debug Mode):**
- استخدام تجميع Just-In-Time (JIT)
- تمكين hot reload و hot restart
- تتضمن معلومات التصحيح والتأكيدات
- حجم binary أكبر ولكن تجميع أسرع

**builds الإنتاج (Release Mode):**
- استخدام تجميع Ahead-Of-Time (AOT)
- محسن للأداء والحجم
- لا توجد overhead للتصحيح
- binaries أصغر وأسرع

## 2.2 تجميع Dart إلى Native

تبدأ عملية تجميع Flutter بكود مصدر Dart الخاص بك وتحوله عبر عدة مراحل قبل إنتاج كود الآلة native.

\`\`\`dart
// كود Dart الخاص بك
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text('مرحباً، Flutter!'),
        ),
      ),
    );
  }
}
\`\`\`

### مراحل التجميع

1. **تحليل مصدر Dart**: يتحقق محلل Dart من كودك من أخطاء النحو وأخطاء النوع ومشاكل أخرى
2. **إنشاء Kernel**: يتم تجميع كود Dart إلى تنسيق Dart Kernel (ملفات .dill)
3. **التجميع الخاص بالمنصة**: يتم تجميع Kernel إلى كود native للمنصة المستهدفة
4. **الربط والتعبئة**: يتم ربط الكود native مع محرك Flutter وتعبئته

## 2.3 عملية بناء Android و Gradle

عملية بناء Android منسقة بواسطة Gradle، نظام البناء الرسمي لـ Android. فهم هذه العملية أساسي لتخصيص builds، وإدارة التبعيات، واستكشاف مشاكل البناء.

### تكوين Gradle Build

\`\`\`gradle
// android/app/build.gradle
android {
    compileSdkVersion 33
    
    defaultConfig {
        applicationId "com.example.myapp"
        minSdkVersion 21
        targetSdkVersion 33
        versionCode flutterVersionCode.toInteger()
        versionName flutterVersionName
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            useProguard true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
\`\`\`

### خط أنابيب بناء Android

1. **معالجة الموارد**: يتم معالجة وتجميع موارد Android (layouts، drawables، strings)
2. **تجميع Dart**: يتم تجميع كود Flutter Dart إلى كود ARM/x64 native
3. **تكامل المكتبة Native**: يتم تعبئة محرك Flutter وكود Dart المجمع كمكتبات native
4. **إنشاء APK/AAB**: يتم تعبئة كل شيء في APK أو Android App Bundle

## 2.4 عملية بناء iOS وتكامل Xcode

عملية بناء iOS تتكامل مع نظام بناء Xcode وتتبع خط أنابيب تجميع Apple مع دمج خطوات خاصة بـ Flutter.

### تكوين بناء iOS

\`\`\`xml
<!-- ios/Runner/Info.plist -->
<key>CFBundleIdentifier</key>
<string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
<key>CFBundleName</key>
<string>MyApp</string>
<key>CFBundleVersion</key>
<string>$(FLUTTER_BUILD_NUMBER)</string>
\`\`\`

### خط أنابيب بناء iOS

1. **إنشاء مشروع Xcode**: ينشئ Flutter أو يحدث مشروع Xcode
2. **تجميع Dart AOT**: يتم تجميع كود Dart إلى كود ARM64 native
3. **تكامل Framework**: يتم تضمين Flutter.framework في تطبيق iOS
4. **توقيع الكود**: يتم توقيع التطبيق بشهادة التطوير أو التوزيع الخاصة بك
5. **إنشاء IPA**: يتم إنشاء حزمة تطبيق iOS النهائية

فهم عمليات البناء هذه يساعدك على تحسين أوقات التجميع، واستكشاف المشاكل الخاصة بالمنصة، واتخاذ قرارات مدروسة حول هيكل التطبيق واستراتيجيات النشر.
    `
  };
} 