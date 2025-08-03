// Arabic book content data structure
export const bookDataArabic = {
  title: "Flutter المخفي: غوص عميق في الآليات الداخلية والمفاهيم المتقدمة",
  subtitle: "دليل شامل لمطوري Flutter ذوي الخبرة",
  
  parts: [
    {
      id: 1,
      title: "الآليات الأساسية لـ Flutter",
      description: "اغوص عميقاً في الأشجار الثلاث لـ Flutter وعملية البناء والهيكل الداخلي",
      chapters: [
        {
          id: 1,
          title: "ما وراء الـ Widget: فهم الأشجار الثلاث لـ Flutter",
          sections: [
            "شجرة الـ Widget: مخطط واجهة المستخدم الخاص بك",
            "شجرة الـ Element: الجسر القابل للتغيير", 
            "شجرة الـ Render: رسم البكسلات على الشاشة",
            "رقصة الأشجار: كيف تحدث تحديثات واجهة المستخدم"
          ],
          readTime: "25 دقيقة",
          content: `
# الفصل الأول: ما وراء الـ Widget: فهم الأشجار الثلاث لـ Flutter

في Flutter، كل شيء هو widget. هذا الشعار المتكرر أساسي لفهم نموذج واجهة المستخدم التصريحي في Flutter. ومع ذلك، فإن كائنات الـ \`Widget\` التي تكتبها في كود Dart الخاص بك هي مجرد مخططات. خلف الكواليس، يستخدم Flutter نظاماً معقداً يتضمن ثلاث أشجار متميزة ولكن مترابطة لعرض وتحديث واجهة المستخدم لتطبيقك بكفاءة: شجرة الـ Widget، وشجرة الـ Element، وشجرة الـ Render.

## 1.1 شجرة الـ Widget: مخطط واجهة المستخدم الخاص بك

شجرة الـ Widget هي الأكثر ألفة من الأشجار الثلاث لمطوري Flutter، حيث تتوافق مباشرة مع كود واجهة المستخدم التصريحي المكتوب في Dart. كل مكون مرئي وغير مرئي في تطبيق Flutter هو، في جوهره، \`Widget\`. من \`Text\` و \`Image\` إلى \`Column\` و \`GestureDetector\`، كل \`Widget\` يعمل كوصف تصريحي لجزء من واجهة المستخدم.

\`\`\`dart
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('مرحباً Flutter'),
        Container(
          child: Icon(Icons.star),
        ),
      ],
    );
  }
}
\`\`\`

من المهم فهم أن كائنات الـ \`Widget\` في Flutter **غير قابلة للتغيير**. هذا عدم القابلية للتغيير هو حجر الزاوية في أداء Flutter وقابليته للتنبؤ. بمجرد إنشاء كائن \`Widget\`، لا يمكن تغيير تكوينه (خصائصه).

## 1.2 شجرة الـ Element: الجسر القابل للتغيير

بينما الـ \`Widget\`s هي المخططات التصريحية لواجهة المستخدم الخاصة بك، فإن شجرة الـ \`Element\` هي التمثيل المتغير والملموس لتسلسل واجهة المستخدم لتطبيقك. لكل \`Widget\` في شجرة الـ Widget، ينشئ Flutter \`Element\` مقابل في شجرة الـ Element.

على عكس الـ \`Widget\`s، الـ \`Element\`s قابلة للتغيير وأكثر استمرارية. إنها الوسطاء بين تكوينات الـ \`Widget\` غير القابلة للتغيير والـ \`RenderObject\`s منخفضة المستوى التي تتعامل مع العرض الفعلي.

## 1.3 شجرة الـ Render: رسم البكسلات على الشاشة

شجرة الـ \`Render\`، المعروفة أيضاً باسم شجرة الـ \`RenderObject\`، هي الشجرة الأدنى مستوى في خط أنابيب عرض واجهة المستخدم في Flutter. بينما تصف شجرة الـ Widget تكوين واجهة المستخدم المرغوب وتدير شجرة الـ Element تسلسل واجهة المستخدم، فإن شجرة الـ Render مسؤولة عن التخطيط الفعلي والرسم واختبار الضرب لواجهة المستخدم على الشاشة.

الـ \`RenderObject\`s محسنة بشدة للأداء. إنها مصممة لتكون فعالة من ناحية استخدام الذاكرة وسرعة العرض. على عكس الـ \`Widget\`s، التي هي غير قابلة للتغيير ويتم إعادة بنائها بشكل متكرر، فإن الـ \`RenderObject\`s قابلة للتغيير ومستمرة.

## 1.4 رقصة الأشجار: كيف تحدث تحديثات واجهة المستخدم

تكمن القوة الحقيقية وكفاءة محرك العرض في Flutter في الرقصة المعقدة بين أشجار الـ Widget والـ Element والـ Render أثناء تحديثات واجهة المستخدم. هذا الجهد المنسق، الذي يُشار إليه غالباً باسم **عملية المصالحة**، هو ما يسمح لـ Flutter بتحقيق أدائه المثير للإعجاب والرسوم المتحركة السلسة.

عندما يتم استدعاء method الـ \`setState()\` الخاص بـ \`StatefulWidget\`، أو عندما يعيد \`StatelessWidget\` الأصل البناء، يتم إنشاء شجرة \`Widget\` جديدة. ثم يشرع Flutter في عملية مقارنة شجرة الـ \`Widget\` الجديدة هذه مع شجرة الـ \`Element\` الموجودة.
          `
        },
        {
          id: 2,
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
        },
        {
          id: 3,
          title: "إدارة إصدارات Flutter SDK",
          sections: [
            "واجهة سطر الأوامر flutter",
            "FVM (إدارة إصدارات Flutter)",
            "إدارة القنوات والتحديثات",
            "إعداد البيئة والتكوين"
          ],
          readTime: "20 دقيقة",
          content: `
# الفصل الثالث: إدارة إصدارات Flutter SDK

كمطور Flutter، ستواجه حتماً سيناريوهات حيث تصبح إدارة إصدارات مختلفة من Flutter SDK أمراً بالغ الأهمية. سواء كنت تعمل على مشاريع متعددة بمتطلبات SDK مختلفة، أو تختبر ميزات جديدة من قناة pre-release، أو تتعاون ضمن فريق يحتاج إلى بيئات تطوير متسقة، فإن إدارة SDK فعالة أمر أساسي.

## 3.1 واجهة سطر الأوامر flutter

واجهة سطر الأوامر flutter هي أداةك الأساسية للتفاعل مع Flutter SDK. توفر مجموعة شاملة من الأوامر لإنشاء وتشغيل وبناء واختبار وتحليل تطبيقات Flutter.

### الأوامر الأساسية لسطر الأوامر

\`\`\`bash
# فحص تثبيت Flutter والتبعيات
flutter doctor

# إنشاء مشروع Flutter جديد
flutter create my_app

# تشغيل التطبيق في وضع التصحيح
flutter run

# بناء التطبيق للإنتاج
flutter build apk --release

# الحصول على الحزم
flutter pub get

# تشغيل الاختبارات
flutter test

# تحليل الكود
flutter analyze
\`\`\`

### flutter doctor: فحص صحة بيئة التطوير

أحد أكثر الأوامر استخداماً وضرورية في flutter CLI هو \`flutter doctor\`. يقوم هذا الأمر بفحص شامل لصحة بيئة التطوير، ويتحقق من أن جميع الأدوات والتكوينات الضرورية لتطوير Flutter مثبتة ومعدة بشكل صحيح.

عندما تشغل \`flutter doctor\`، يتحقق من:
- **تثبيت Flutter SDK والإصدار**
- **أدوات Android (Android Studio، مكونات SDK)**
- **Xcode (لتطوير iOS/macOS)**
- **Chrome (لتطوير الويب)**
- **الأجهزة والمحاكيات المتصلة**
- **إضافات IDE**

### flutter upgrade وإدارة القنوات

الحفاظ على تحديث Flutter SDK أمر بالغ الأهمية للوصول إلى أحدث الميزات وتحسينات الأداء وإصلاحات الأخطاء. يُستخدم أمر \`flutter upgrade\` لتحديث Flutter SDK إلى أحدث إصدار متاح على القناة المحددة حالياً.

ينظم Flutter إصداراته في قنوات مختلفة:
- **stable**: موصى به لمعظم المطورين وتطبيقات الإنتاج
- **beta**: يوفر وصولاً مبكراً للميزات القادمة
- **dev**: للمطورين الذين يريدون تجربة أحدث الميزات
- **master**: الحافة النزافة لتطوير Flutter

\`\`\`bash
# الانتقال إلى قناة stable
flutter channel stable
flutter upgrade

# الانتقال إلى قناة beta
flutter channel beta
flutter upgrade

# فحص القناة الحالية
flutter --version
\`\`\`

## 3.2 FVM (إدارة إصدارات Flutter): أفضل صديق للمطور

FVM هي أداة قوية لسطر الأوامر تبسط عملية إدارة إصدارات Flutter SDK متعددة على جهاز واحد. تسمح لك بـ:

- تثبيت وإدارة إصدارات Flutter SDK متعددة
- تبديل إصدارات SDK لكل مشروع
- مشاركة تكوينات SDK مع أعضاء الفريق
- اختبار إصدارات SDK الجديدة بأمان

### تثبيت وتكوين FVM

تثبيت FVM أمر بسيط:

\`\`\`bash
# تثبيت FVM
dart pub global activate fvm

# تثبيت إصدارات Flutter SDK محددة
fvm install stable
fvm install 3.16.9
fvm install beta

# قائمة الإصدارات المثبتة
fvm list
\`\`\`

### إصدارات SDK لكل مشروع

القوة الأساسية لـ FVM تكمن في قدرتها على تعيين إصدار Flutter SDK محدد للمشاريع الفردية:

\`\`\`bash
# تعيين إصدار SDK للمشروع الحالي
fvm use stable

# تعيين إصدار محدد
fvm use 3.16.9

# فحص الإصدار المستخدم
fvm flutter --version
\`\`\`

فهم هذه الأدوات والعمليات يساعدك على إدارة بيئة التطوير بكفاءة، والتعامل مع متطلبات المشاريع المختلفة، والحفاظ على بيئة تطوير متسقة عبر الفريق.
          `
        },
        {
          id: 4,
          title: "تحسين الأداء والذاكرة",
          sections: [
            "أدوات قياس الأداء",
            "تحسين استخدام الذاكرة",
            "تقنيات التجميع الذكي",
            "تحليل الأداء في الإنتاج"
          ],
          readTime: "25 دقيقة",
          content: `
# الفصل الرابع: تحسين الأداء والذاكرة

الأداء هو جانب حاسم في تطوير التطبيقات الحديثة. في Flutter، يمكن أن يكون الفرق بين تطبيق سلس وتطبيق بطيء في التفاصيل الدقيقة لاستخدام الذاكرة، وإدارة الحالة، وتقنيات التجميع. سيعلمك هذا الفصل كيفية تحديد وتحسين نقاط الضعف في الأداء.

## 4.1 أدوات قياس الأداء

Flutter يوفر مجموعة شاملة من الأدوات لقياس وتحليل أداء تطبيقك.

### Flutter Inspector

Flutter Inspector هو أداة قوية مدمجة في DevTools تتيح لك:

- فحص شجرة Widget في الوقت الفعلي
- تحليل إعادة البناء غير الضرورية
- تحديد مشاكل التخطيط
- فحص خصائص Widget

\`\`\`dart
// مثال على استخدام RepaintBoundary لتحسين الأداء
class OptimizedWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RepaintBoundary(
      child: Container(
        color: Colors.blue,
        child: Text('هذا Widget لن يعيد الرسم إلا عند تغيير محتواه'),
      ),
    );
  }
}
\`\`\`

### Performance Overlay

Performance Overlay يوفر رؤية في الوقت الفعلي لأداء التطبيق:

\`\`\`dart
import 'package:flutter/services.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Stack(
          children: [
            // محتوى التطبيق
            MyHomePage(),
            // overlay الأداء
            Positioned(
              top: 0,
              left: 0,
              child: PerformanceOverlay.allEnabled(),
            ),
          ],
        ),
      ),
    );
  }
}
\`\`\`

## 4.2 تحسين استخدام الذاكرة

إدارة الذاكرة الفعالة أمر بالغ الأهمية لتطبيقات Flutter، خاصة على الأجهزة منخفضة الموارد.

### تقنيات توفير الذاكرة

\`\`\`dart
// استخدام const constructors
class OptimizedWidget extends StatelessWidget {
  // استخدام const للـ widgets الثابتة
  static const TextStyle _titleStyle = TextStyle(
    fontSize: 18,
    fontWeight: FontWeight.bold,
  );
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('العنوان', style: _titleStyle), // const style
        const SizedBox(height: 10), // const widget
        const Icon(Icons.star), // const widget
      ],
    );
  }
}
\`\`\`

### إدارة الصور

\`\`\`dart
// تحسين تحميل الصور
class OptimizedImage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Image.network(
      'https://example.com/image.jpg',
      // استخدام cache للصور
      cacheWidth: 300, // تحديد عرض الصورة المخزنة
      cacheHeight: 200, // تحديد ارتفاع الصورة المخزنة
      // استخدام placeholder
      placeholder: (context, url) => CircularProgressIndicator(),
      // معالجة الأخطاء
      errorWidget: (context, url, error) => Icon(Icons.error),
    );
  }
}
\`\`\`

## 4.3 تقنيات التجميع الذكي

التجميع الذكي يقلل من عدد مرات إعادة بناء Widgets غير الضرورية.

### استخدام shouldRebuild

\`\`\`dart
class OptimizedStatefulWidget extends StatefulWidget {
  @override
  _OptimizedStatefulWidgetState createState() => _OptimizedStatefulWidgetState();
}

class _OptimizedStatefulWidgetState extends State<OptimizedStatefulWidget> {
  int _counter = 0;
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // هذا Widget سيعيد البناء فقط عند تغيير _counter
        ValueListenableBuilder<int>(
          valueListenable: ValueNotifier(_counter),
          builder: (context, value, child) {
            return Text('العداد: $value');
          },
        ),
        ElevatedButton(
          onPressed: () {
            setState(() {
              _counter++;
            });
          },
          child: Text('زيادة'),
        ),
      ],
    );
  }
}
\`\`\`

فهم هذه التقنيات والأدوات يساعدك على بناء تطبيقات Flutter سريعة وفعالة توفر تجربة مستخدم استثنائية.
          `
        },
        {
          id: 5,
          title: "تصحيح الأخطاء المتقدم",
          sections: [
            "أدوات التصحيح المتقدمة",
            "تحليل الأخطاء في الإنتاج",
            "تقنيات التصحيح عن بُعد",
            "أفضل الممارسات للتصحيح"
          ],
          readTime: "30 دقيقة",
          content: `
# الفصل الخامس: تصحيح الأخطاء المتقدم

التصحيح الفعال هو مهارة أساسية لأي مطور Flutter. بينما يوفر Flutter أدوات تصحيح قوية، فإن فهم كيفية استخدامها بشكل متقدم يمكن أن يقلل بشكل كبير من الوقت المستغرق في حل المشاكل. سيعلمك هذا الفصل تقنيات التصحيح المتقدمة وأدوات تحليل الأخطاء.

## 5.1 أدوات التصحيح المتقدمة

### Flutter DevTools

DevTools هي مجموعة شاملة من الأدوات لتصحيح وتحليل تطبيقات Flutter:

\`\`\`dart
// تفعيل DevTools في التطبيق
import 'package:flutter/foundation.dart';

void main() {
  if (kDebugMode) {
    // تفعيل DevTools في وضع التصحيح
    debugPrintRebuildDirtyWidgets = true;
  }
  runApp(MyApp());
}
\`\`\`

### استخدام debugPrint

\`\`\`dart
class DebugWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // طباعة معلومات التصحيح
    debugPrint('بناء DebugWidget');
    
    return Container(
      child: Text('Widget للتصحيح'),
    );
  }
}

// تصحيح معلومات الحالة
class DebugStatefulWidget extends StatefulWidget {
  @override
  _DebugStatefulWidgetState createState() => _DebugStatefulWidgetState();
}

class _DebugStatefulWidgetState extends State<DebugStatefulWidget> {
  int _counter = 0;
  
  void _incrementCounter() {
    setState(() {
      _counter++;
      // طباعة معلومات التصحيح
      debugPrint('تم زيادة العداد إلى: $_counter');
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('العداد: $_counter'),
        ElevatedButton(
          onPressed: _incrementCounter,
          child: Text('زيادة'),
        ),
      ],
    );
  }
}
\`\`\`

## 5.2 تحليل الأخطاء في الإنتاج

### استخدام Crashlytics

\`\`\`dart
import 'package:firebase_crashlytics/firebase_crashlytics.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  
  // تفعيل Crashlytics
  FlutterError.onError = FirebaseCrashlytics.instance.recordFlutterError;
  
  runApp(MyApp());
}

// تسجيل أخطاء مخصصة
void logCustomError(String error, StackTrace stackTrace) {
  FirebaseCrashlytics.instance.recordError(
    error,
    stackTrace,
    reason: 'خطأ مخصص',
  );
}
\`\`\`

### معالجة الأخطاء المتقدمة

\`\`\`dart
class ErrorBoundary extends StatefulWidget {
  final Widget child;
  
  const ErrorBoundary({Key? key, required this.child}) : super(key: key);
  
  @override
  _ErrorBoundaryState createState() => _ErrorBoundaryState();
}

class _ErrorBoundaryState extends State<ErrorBoundary> {
  bool _hasError = false;
  String _errorMessage = '';
  
  @override
  void initState() {
    super.initState();
    // التقاط أخطاء غير معالجة
    FlutterError.onError = (FlutterErrorDetails details) {
      setState(() {
        _hasError = true;
        _errorMessage = details.exception.toString();
      });
    };
  }
  
  @override
  Widget build(BuildContext context) {
    if (_hasError) {
      return Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.error, size: 64, color: Colors.red),
              SizedBox(height: 16),
              Text('حدث خطأ', style: TextStyle(fontSize: 24)),
              SizedBox(height: 8),
              Text(_errorMessage),
              SizedBox(height: 16),
              ElevatedButton(
                onPressed: () {
                  setState(() {
                    _hasError = false;
                    _errorMessage = '';
                  });
                },
                child: Text('إعادة المحاولة'),
              ),
            ],
          ),
        ),
      );
    }
    
    return widget.child;
  }
}
\`\`\`

## 5.3 تقنيات التصحيح عن بُعد

### استخدام Firebase Remote Config

\`\`\`dart
import 'package:firebase_remote_config/firebase_remote_config.dart';

class RemoteDebugConfig {
  static final RemoteConfig _remoteConfig = RemoteConfig.instance;
  
  static Future<void> initialize() async {
    await _remoteConfig.setConfigSettings(RemoteConfigSettings(
      fetchTimeout: Duration(minutes: 1),
      minimumFetchInterval: Duration(hours: 1),
    ));
    
    await _remoteConfig.setDefaults({
      'debug_mode': false,
      'log_level': 'info',
    });
    
    await _remoteConfig.fetchAndActivate();
  }
  
  static bool get isDebugMode => _remoteConfig.getBool('debug_mode');
  static String get logLevel => _remoteConfig.getString('log_level');
}
\`\`\`

فهم هذه التقنيات والأدوات يساعدك على بناء تطبيقات Flutter قوية وموثوقة مع قدرات تصحيح متقدمة.
          `
        },
        {
          id: 6,
          title: "بناء Widgets مخصصة متقدمة",
          sections: [
            "مبادئ تصميم Widget",
            "إنشاء RenderObjects مخصصة",
            "تحسين الأداء للـ Widgets المخصصة",
            "أفضل الممارسات"
          ],
          readTime: "35 دقيقة",
          content: `
# الفصل السادس: بناء Widgets مخصصة متقدمة

بناء Widgets مخصصة هو أحد أقوى جوانب Flutter. بينما توفر مكتبة Flutter الأساسية مجموعة شاملة من Widgets، فإن القدرة على إنشاء Widgets مخصصة تتيح لك بناء واجهات مستخدم فريدة ومحسنة. سيعلمك هذا الفصل كيفية بناء Widgets مخصصة متقدمة مع التركيز على الأداء والمرونة.

## 6.1 مبادئ تصميم Widget

### هيكل Widget الأساسي

\`\`\`dart
class CustomWidget extends StatelessWidget {
  final String title;
  final VoidCallback? onTap;
  
  const CustomWidget({
    Key? key,
    required this.title,
    this.onTap,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.blue,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Text(
          title,
          style: TextStyle(
            color: Colors.white,
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}
\`\`\`

### Widget مع الحالة

\`\`\`dart
class AnimatedCustomWidget extends StatefulWidget {
  final String title;
  final Duration animationDuration;
  
  const AnimatedCustomWidget({
    Key? key,
    required this.title,
    this.animationDuration = const Duration(milliseconds: 300),
  }) : super(key: key);
  
  @override
  _AnimatedCustomWidgetState createState() => _AnimatedCustomWidgetState();
}

class _AnimatedCustomWidgetState extends State<AnimatedCustomWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: widget.animationDuration,
      vsync: this,
    );
    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 1.1,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    ));
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => _controller.forward(),
      onTapUp: (_) => _controller.reverse(),
      onTapCancel: () => _controller.reverse(),
      child: AnimatedBuilder(
        animation: _scaleAnimation,
        builder: (context, child) {
          return Transform.scale(
            scale: _scaleAnimation.value,
            child: Container(
              padding: EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.blue,
                borderRadius: BorderRadius.circular(8),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.2),
                    blurRadius: 8,
                    offset: Offset(0, 4),
                  ),
                ],
              ),
              child: Text(
                widget.title,
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
\`\`\`

## 6.2 إنشاء RenderObjects مخصصة

### RenderObject أساسي

\`\`\`dart
class CustomRenderObject extends RenderBox {
  @override
  void performLayout() {
    // حساب الحجم المطلوب
    size = constraints.biggest;
  }
  
  @override
  void paint(PaintingContext context, Offset offset) {
    final canvas = context.canvas;
    final paint = Paint()
      ..color = Colors.blue
      ..style = PaintingStyle.fill;
    
    // رسم مستطيل
    canvas.drawRect(
      Rect.fromLTWH(offset.dx, offset.dy, size.width, size.height),
      paint,
    );
    
    // رسم نص
    final textPainter = TextPainter(
      text: TextSpan(
        text: 'Widget مخصص',
        style: TextStyle(
          color: Colors.white,
          fontSize: 16,
        ),
      ),
      textDirection: TextDirection.ltr,
    );
    
    textPainter.layout();
    textPainter.paint(
      canvas,
      Offset(
        offset.dx + (size.width - textPainter.width) / 2,
        offset.dy + (size.height - textPainter.height) / 2,
      ),
    );
  }
}
\`\`\`

### Widget مع RenderObject مخصص

\`\`\`dart
class CustomRenderWidget extends SingleChildRenderObjectWidget {
  final Color color;
  final String text;
  
  const CustomRenderWidget({
    Key? key,
    required this.color,
    required this.text,
    Widget? child,
  }) : super(key: key, child: child);
  
  @override
  RenderObject createRenderObject(BuildContext context) {
    return CustomRenderObject(color: color, text: text);
  }
  
  @override
  void updateRenderObject(BuildContext context, CustomRenderObject renderObject) {
    renderObject.color = color;
    renderObject.text = text;
  }
}

class CustomRenderObject extends RenderBox {
  Color _color;
  String _text;
  
  CustomRenderObject({
    required Color color,
    required String text,
  }) : _color = color, _text = text;
  
  Color get color => _color;
  set color(Color value) {
    if (_color != value) {
      _color = value;
      markNeedsPaint();
    }
  }
  
  String get text => _text;
  set text(String value) {
    if (_text != value) {
      _text = value;
      markNeedsPaint();
    }
  }
  
  @override
  void performLayout() {
    size = constraints.biggest;
  }
  
  @override
  void paint(PaintingContext context, Offset offset) {
    final canvas = context.canvas;
    final paint = Paint()
      ..color = _color
      ..style = PaintingStyle.fill;
    
    canvas.drawRect(
      Rect.fromLTWH(offset.dx, offset.dy, size.width, size.height),
      paint,
    );
    
    final textPainter = TextPainter(
      text: TextSpan(
        text: _text,
        style: TextStyle(
          color: Colors.white,
          fontSize: 16,
        ),
      ),
      textDirection: TextDirection.ltr,
    );
    
    textPainter.layout();
    textPainter.paint(
      canvas,
      Offset(
        offset.dx + (size.width - textPainter.width) / 2,
        offset.dy + (size.height - textPainter.height) / 2,
      ),
    );
  }
}
\`\`\`

فهم هذه التقنيات يساعدك على بناء Widgets مخصصة قوية وفعالة تمد قدرات Flutter.
          `
        },
        {
          id: 7,
          title: "إدارة الحالة المتقدمة",
          sections: [
            "أنماط إدارة الحالة",
            "Provider و Riverpod",
            "Bloc و Cubit",
            "إدارة الحالة العالمية"
          ],
          readTime: "40 دقيقة",
          content: `
# الفصل السابع: إدارة الحالة المتقدمة

إدارة الحالة هي أحد أهم جوانب تطوير تطبيقات Flutter. مع نمو التطبيق، تصبح إدارة الحالة أكثر تعقيداً وتتطلب أنماطاً متقدمة لضمان قابلية الصيانة والأداء. سيعلمك هذا الفصل أنماط إدارة الحالة المتقدمة وأفضل الممارسات.

## 7.1 أنماط إدارة الحالة

### إدارة الحالة المحلية

\`\`\`dart
class LocalStateWidget extends StatefulWidget {
  @override
  _LocalStateWidgetState createState() => _LocalStateWidgetState();
}

class _LocalStateWidgetState extends State<LocalStateWidget> {
  int _counter = 0;
  bool _isLoading = false;
  
  void _incrementCounter() async {
    setState(() {
      _isLoading = true;
    });
    
    // محاكاة عملية غير متزامنة
    await Future.delayed(Duration(seconds: 1));
    
    setState(() {
      _counter++;
      _isLoading = false;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('العداد: $_counter'),
        if (_isLoading)
          CircularProgressIndicator()
        else
          ElevatedButton(
            onPressed: _incrementCounter,
            child: Text('زيادة'),
          ),
      ],
    );
  }
}
\`\`\`

## 7.2 Provider و Riverpod

### استخدام Provider

\`\`\`dart
import 'package:provider/provider.dart';

// نموذج البيانات
class UserModel extends ChangeNotifier {
  String _name = '';
  String _email = '';
  
  String get name => _name;
  String get email => _email;
  
  void updateUser(String name, String email) {
    _name = name;
    _email = email;
    notifyListeners();
  }
}

// Widget الرئيسي
class ProviderApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => UserModel(),
      child: MaterialApp(
        home: UserProfileScreen(),
      ),
    );
  }
}

// شاشة الملف الشخصي
class UserProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('الملف الشخصي')),
      body: Consumer<UserModel>(
        builder: (context, user, child) {
          return Column(
            children: [
              Text('الاسم: \${user.name}'),
              Text('البريد الإلكتروني: \${user.email}'),
              ElevatedButton(
                onPressed: () {
                  user.updateUser('أحمد', 'ahmed@example.com');
                },
                child: Text('تحديث البيانات'),
              ),
            ],
          );
        },
      ),
    );
  }
}
\`\`\`

### استخدام Riverpod

\`\`\`dart
import 'package:flutter_riverpod/flutter_riverpod.dart';

// Provider للحالة
final userProvider = StateNotifierProvider<UserNotifier, User>((ref) {
  return UserNotifier();
});

// نموذج البيانات
class User {
  final String name;
  final String email;
  
  User({required this.name, required this.email});
  
  User copyWith({String? name, String? email}) {
    return User(
      name: name ?? this.name,
      email: email ?? this.email,
    );
  }
}

// StateNotifier
class UserNotifier extends StateNotifier<User> {
  UserNotifier() : super(User(name: '', email: ''));
  
  void updateUser(String name, String email) {
    state = state.copyWith(name: name, email: email);
  }
}

// Widget الرئيسي
class RiverpodApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ProviderScope(
      child: MaterialApp(
        home: UserProfileScreen(),
      ),
    );
  }
}

// شاشة الملف الشخصي
class UserProfileScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(userProvider);
    
    return Scaffold(
      appBar: AppBar(title: Text('الملف الشخصي')),
      body: Column(
        children: [
          Text('الاسم: \${user.name}'),
          Text('البريد الإلكتروني: \${user.email}'),
          ElevatedButton(
            onPressed: () {
              ref.read(userProvider.notifier).updateUser('أحمد', 'ahmed@example.com');
            },
            child: Text('تحديث البيانات'),
          ),
        ],
      ),
    );
  }
}
\`\`\`

## 7.3 Bloc و Cubit

### استخدام Cubit

\`\`\`dart
import 'package:flutter_bloc/flutter_bloc.dart';

// حالة Cubit
abstract class CounterState {
  final int count;
  CounterState(this.count);
}

class CounterInitial extends CounterState {
  CounterInitial() : super(0);
}

class CounterIncremented extends CounterState {
  CounterIncremented(int count) : super(count);
}

// Cubit
class CounterCubit extends Cubit<CounterState> {
  CounterCubit() : super(CounterInitial());
  
  void increment() {
    emit(CounterIncremented(state.count + 1));
  }
  
  void decrement() {
    if (state.count > 0) {
      emit(CounterIncremented(state.count - 1));
    }
  }
}

// Widget الرئيسي
class BlocApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => CounterCubit(),
      child: MaterialApp(
        home: CounterScreen(),
      ),
    );
  }
}

// شاشة العداد
class CounterScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('العداد')),
      body: BlocBuilder<CounterCubit, CounterState>(
        builder: (context, state) {
          return Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'العداد: \${state.count}',
                style: TextStyle(fontSize: 24),
              ),
              SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  ElevatedButton(
                    onPressed: () {
                      context.read<CounterCubit>().decrement();
                    },
                    child: Text('نقص'),
                  ),
                  ElevatedButton(
                    onPressed: () {
                      context.read<CounterCubit>().increment();
                    },
                    child: Text('زيادة'),
                  ),
                ],
              ),
            ],
          );
        },
      ),
    );
  }
}
\`\`\`

فهم هذه الأنماط يساعدك على اختيار الحل المناسب لإدارة الحالة في تطبيقك.
          `
        },
        {
          id: 8,
          title: "اختبار التطبيقات المتقدم",
          sections: [
            "أنواع الاختبارات",
            "اختبار الوحدات والاختبارات التكاملية",
            "اختبارات واجهة المستخدم",
            "أدوات الاختبار والتحليل"
          ],
          readTime: "30 دقيقة",
          content: `
# الفصل الثامن: اختبار التطبيقات المتقدم

الاختبار هو جانب أساسي في تطوير تطبيقات Flutter عالية الجودة. بينما يوفر Flutter إطار عمل قوي للاختبار، فإن فهم كيفية كتابة اختبارات فعالة وشاملة يمكن أن يقلل بشكل كبير من الأخطاء ويحسن جودة التطبيق. سيعلمك هذا الفصل تقنيات الاختبار المتقدمة وأفضل الممارسات.

## 8.1 أنواع الاختبارات

### اختبار الوحدات (Unit Tests)

اختبار الوحدات يختبر وظائف فردية أو classes في عزلة:

\`\`\`dart
import 'package:flutter_test/flutter_test.dart';
import 'package:my_app/models/user.dart';

void main() {
  group('User Model Tests', () {
    test('should create user with valid data', () {
      final user = User(
        id: '1',
        name: 'أحمد',
        email: 'ahmed@example.com',
      );
      
      expect(user.id, '1');
      expect(user.name, 'أحمد');
      expect(user.email, 'ahmed@example.com');
    });
    
    test('should validate email format', () {
      expect(() => User(
        id: '1',
        name: 'أحمد',
        email: 'invalid-email',
      ), throwsA(isA<ArgumentError>()));
    });
  });
}
\`\`\`

### اختبارات التكامل (Integration Tests)

اختبارات التكامل تختبر تفاعل مكونات متعددة:

\`\`\`dart
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:my_app/main.dart' as app;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
  
  group('App Integration Tests', () {
    testWidgets('should navigate through app screens', (tester) async {
      app.main();
      await tester.pumpAndSettle();
      
      // التحقق من وجود زر تسجيل الدخول
      expect(find.text('تسجيل الدخول'), findsOneWidget);
      
      // النقر على زر تسجيل الدخول
      await tester.tap(find.text('تسجيل الدخول'));
      await tester.pumpAndSettle();
      
      // التحقق من الانتقال إلى شاشة تسجيل الدخول
      expect(find.text('البريد الإلكتروني'), findsOneWidget);
      expect(find.text('كلمة المرور'), findsOneWidget);
    });
  });
}
\`\`\`

## 8.2 اختبارات واجهة المستخدم

### اختبار Widgets

\`\`\`dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

class CounterWidget extends StatefulWidget {
  @override
  _CounterWidgetState createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  int _counter = 0;
  
  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('العداد: $_counter'),
        ElevatedButton(
          onPressed: _incrementCounter,
          child: Text('زيادة'),
        ),
      ],
    );
  }
}

void main() {
  testWidgets('Counter should increment when button is pressed', (tester) async {
    await tester.pumpWidget(MaterialApp(home: CounterWidget()));
    
    // التحقق من القيمة الأولية
    expect(find.text('العداد: 0'), findsOneWidget);
    
    // النقر على الزر
    await tester.tap(find.text('زيادة'));
    await tester.pump();
    
    // التحقق من زيادة العداد
    expect(find.text('العداد: 1'), findsOneWidget);
  });
}
\`\`\`

### اختبار التنقل

\`\`\`dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

class NavigationTest extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      initialRoute: '/',
      routes: {
        '/': (context) => HomeScreen(),
        '/details': (context) => DetailsScreen(),
      },
    );
  }
}

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('الرئيسية')),
      body: Center(
        child: ElevatedButton(
          onPressed: () => Navigator.pushNamed(context, '/details'),
          child: Text('عرض التفاصيل'),
        ),
      ),
    );
  }
}

class DetailsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('التفاصيل')),
      body: Center(child: Text('صفحة التفاصيل')),
    );
  }
}

void main() {
  testWidgets('should navigate to details screen', (tester) async {
    await tester.pumpWidget(NavigationTest());
    
    // التحقق من وجود زر التنقل
    expect(find.text('عرض التفاصيل'), findsOneWidget);
    
    // النقر على الزر
    await tester.tap(find.text('عرض التفاصيل'));
    await tester.pumpAndSettle();
    
    // التحقق من الانتقال إلى شاشة التفاصيل
    expect(find.text('التفاصيل'), findsOneWidget);
    expect(find.text('صفحة التفاصيل'), findsOneWidget);
  });
}
\`\`\`

## 8.3 أدوات الاختبار والتحليل

### استخدام Mock Objects

\`\`\`dart
import 'package:mockito/mockito.dart';
import 'package:mockito/annotations.dart';

// إنشاء mock class
@GenerateMocks([UserService])
import 'user_service_test.mocks.dart';

class UserService {
  Future<User> getUser(String id) async {
    // محاكاة استدعاء API
    await Future.delayed(Duration(milliseconds: 100));
    return User(id: id, name: 'أحمد', email: 'ahmed@example.com');
  }
}

void main() {
  group('UserService Tests', () {
    late MockUserService mockUserService;
    
    setUp(() {
      mockUserService = MockUserService();
    });
    
    test('should return user when getUser is called', () async {
      // إعداد mock
      when(mockUserService.getUser('1')).thenAnswer(
        (_) async => User(id: '1', name: 'أحمد', email: 'ahmed@example.com'),
      );
      
      // استدعاء method
      final user = await mockUserService.getUser('1');
      
      // التحقق من النتيجة
      expect(user.id, '1');
      expect(user.name, 'أحمد');
      expect(user.email, 'ahmed@example.com');
      
      // التحقق من استدعاء method
      verify(mockUserService.getUser('1')).called(1);
    });
  });
}
\`\`\`

فهم هذه التقنيات يساعدك على بناء تطبيقات Flutter موثوقة وعالية الجودة.
          `
        },
        {
          id: 9,
          title: "تحسين الأداء المتقدم",
          sections: [
            "تحليل الأداء",
            "تحسين الذاكرة",
            "تحسين الشبكة",
            "أدوات المراقبة"
          ],
          readTime: "35 دقيقة",
          content: `
# الفصل التاسع: تحسين الأداء المتقدم

تحسين الأداء هو جانب حاسم في تطوير تطبيقات Flutter عالية الجودة. مع نمو التطبيق، تصبح تحسينات الأداء أكثر تعقيداً وتتطلب فهم عميق لآليات Flutter الداخلية. سيعلمك هذا الفصل تقنيات تحسين الأداء المتقدمة وأدوات المراقبة.

## 9.1 تحليل الأداء

### استخدام Flutter Inspector

Flutter Inspector هو أداة قوية لتحليل أداء التطبيق:

\`\`\`dart
import 'package:flutter/foundation.dart';

class PerformanceWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // تفعيل تحليل الأداء
    if (kDebugMode) {
      debugPrintRebuildDirtyWidgets = true;
    }
    
    return Container(
      child: Text('Widget محسن للأداء'),
    );
  }
}
\`\`\`

### تحليل إعادة البناء

\`\`\`dart
class OptimizedList extends StatelessWidget {
  final List<String> items;
  
  const OptimizedList({Key? key, required this.items}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: items.length,
      // استخدام key لتحسين الأداء
      itemBuilder: (context, index) {
        return ListTile(
          key: ValueKey(items[index]),
          title: Text(items[index]),
        );
      },
    );
  }
}
\`\`\`

## 9.2 تحسين الذاكرة

### استخدام const constructors

\`\`\`dart
class MemoryOptimizedWidget extends StatelessWidget {
  // استخدام const للـ styles الثابتة
  static const TextStyle _titleStyle = TextStyle(
    fontSize: 18,
    fontWeight: FontWeight.bold,
  );
  
  static const EdgeInsets _padding = EdgeInsets.all(16);
  
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: _padding,
      child: Column(
        children: [
          Text('العنوان', style: _titleStyle),
          const SizedBox(height: 10), // const widget
          const Icon(Icons.star), // const widget
        ],
      ),
    );
  }
}
\`\`\`

### تحسين الصور

\`\`\`dart
class OptimizedImageWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Image.network(
      'https://example.com/image.jpg',
      // تحديد أبعاد الصورة المخزنة
      cacheWidth: 300,
      cacheHeight: 200,
      // استخدام placeholder
      placeholder: (context, url) => CircularProgressIndicator(),
      // معالجة الأخطاء
      errorWidget: (context, url, error) => Icon(Icons.error),
      // تحسين التحميل
      loadingBuilder: (context, child, loadingProgress) {
        if (loadingProgress == null) return child;
        return Center(
          child: CircularProgressIndicator(
            value: loadingProgress.expectedTotalBytes != null
                ? loadingProgress.cumulativeBytesLoaded /
                    loadingProgress.expectedTotalBytes!
                : null,
          ),
        );
      },
    );
  }
}
\`\`\`

## 9.3 تحسين الشبكة

### استخدام HTTP caching

\`\`\`dart
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class NetworkOptimizedService {
  static const String _baseUrl = 'https://api.example.com';
  
  static Future<String> getData(String endpoint) async {
    final prefs = await SharedPreferences.getInstance();
    final cacheKey = 'cache_$endpoint';
    
    // محاولة الحصول على البيانات من cache
    final cachedData = prefs.getString(cacheKey);
    if (cachedData != null) {
      return cachedData;
    }
    
    // جلب البيانات من الشبكة
    final response = await http.get(Uri.parse('$_baseUrl/$endpoint'));
    
    if (response.statusCode == 200) {
      final data = response.body;
      
      // حفظ البيانات في cache
      await prefs.setString(cacheKey, data);
      
      return data;
    } else {
      throw Exception('فشل في جلب البيانات');
    }
  }
}
\`\`\`

## 9.4 أدوات المراقبة

### استخدام Firebase Performance

\`\`\`dart
import 'package:firebase_performance/firebase_performance.dart';

class PerformanceMonitor {
  static Future<void> monitorOperation(String operationName) async {
    final trace = FirebasePerformance.instance.newTrace(operationName);
    await trace.start();
    
    try {
      // تنفيذ العملية
      await performOperation();
    } finally {
      await trace.stop();
    }
  }
  
  static Future<void> performOperation() async {
    // محاكاة عملية تستغرق وقتاً
    await Future.delayed(Duration(seconds: 2));
  }
}
\`\`\`

فهم هذه التقنيات يساعدك على بناء تطبيقات Flutter سريعة وفعالة.
          `
        },
        {
          id: 10,
          title: "النشر والتوزيع",
          sections: [
            "إعداد التطبيق للنشر",
            "بناء APK و IPA",
            "نشر على متاجر التطبيقات",
            "مراقبة الأداء في الإنتاج"
          ],
          readTime: "40 دقيقة",
          content: `
# الفصل العاشر: النشر والتوزيع

النشر والتوزيع هو الخطوة النهائية في تطوير تطبيق Flutter. فهم عملية النشر الصحيحة وكيفية إعداد التطبيق للتوزيع أمر بالغ الأهمية لضمان نجاح التطبيق في السوق. سيعلمك هذا الفصل كيفية إعداد ونشر تطبيق Flutter بشكل احترافي.

## 10.1 إعداد التطبيق للنشر

### تكوين التطبيق

\`\`\`yaml
# pubspec.yaml
name: my_flutter_app
description: تطبيق Flutter مخصص
version: 1.0.0+1

environment:
  sdk: ">=2.17.0 <4.0.0"
  flutter: ">=3.0.0"

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.2
  http: ^0.13.5
  shared_preferences: ^2.0.15

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^2.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/
    - assets/icons/
\`\`\`

### إعداد Android

\`\`\`xml
<!-- android/app/src/main/AndroidManifest.xml -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application
        android:label="تطبيقي"
        android:name="\${applicationName}"
        android:icon="@mipmap/ic_launcher">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTop"
            android:theme="@style/LaunchTheme"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|smallestScreenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
            android:hardwareAccelerated="true"
            android:windowSoftInputMode="adjustResize">
            <meta-data
              android:name="io.flutter.embedding.android.NormalTheme"
              android:resource="@style/NormalTheme"
              />
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
        <meta-data
            android:name="flutterEmbedding"
            android:value="2" />
    </application>
</manifest>
\`\`\`

### إعداد iOS

\`\`\`xml
<!-- ios/Runner/Info.plist -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleDevelopmentRegion</key>
    <string>$(DEVELOPMENT_LANGUAGE)</string>
    <key>CFBundleDisplayName</key>
    <string>تطبيقي</string>
    <key>CFBundleExecutable</key>
    <string>$(EXECUTABLE_NAME)</string>
    <key>CFBundleIdentifier</key>
    <string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
    <key>CFBundleInfoDictionaryVersion</key>
    <string>6.0</string>
    <key>CFBundleName</key>
    <string>my_flutter_app</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleShortVersionString</key>
    <string>$(FLUTTER_BUILD_NAME)</string>
    <key>CFBundleSignature</key>
    <string>????</string>
    <key>CFBundleVersion</key>
    <string>$(FLUTTER_BUILD_NUMBER)</string>
    <key>LSRequiresIPhoneOS</key>
    <true/>
    <key>UILaunchStoryboardName</key>
    <string>LaunchScreen</string>
    <key>UIMainStoryboardFile</key>
    <string>Main</string>
    <key>UISupportedInterfaceOrientations</key>
    <array>
        <string>UIInterfaceOrientationPortrait</string>
        <string>UIInterfaceOrientationLandscapeLeft</string>
        <string>UIInterfaceOrientationLandscapeRight</string>
    </array>
    <key>UISupportedInterfaceOrientations~ipad</key>
    <array>
        <string>UIInterfaceOrientationPortrait</string>
        <string>UIInterfaceOrientationPortraitUpsideDown</string>
        <string>UIInterfaceOrientationLandscapeLeft</string>
        <string>UIInterfaceOrientationLandscapeRight</string>
    </array>
    <key>UIViewControllerBasedStatusBarAppearance</key>
    <false/>
    <key>CADisableMinimumFrameDurationOnPhone</key>
    <true/>
    <key>UIApplicationSupportsIndirectInputEvents</key>
    <true/>
</dict>
</plist>
\`\`\`

## 10.2 بناء APK و IPA

### بناء APK للإنتاج

\`\`\`bash
# بناء APK للإنتاج
flutter build apk --release

# بناء APK مقسم (للأجهزة المختلفة)
flutter build apk --split-per-abi --release

# بناء App Bundle (موصى به لـ Google Play)
flutter build appbundle --release
\`\`\`

### بناء IPA لـ iOS

\`\`\`bash
# بناء IPA
flutter build ios --release

# بناء IPA مع توقيع
flutter build ipa --release
\`\`\`

## 10.3 نشر على متاجر التطبيقات

### نشر على Google Play

1. **إنشاء حساب مطور**
2. **إعداد التطبيق في Google Play Console**
3. **رفع APK أو App Bundle**
4. **إعداد صفحة التطبيق**
5. **إرسال للمراجعة**

### نشر على App Store

1. **إنشاء حساب Apple Developer**
2. **إعداد التطبيق في App Store Connect**
3. **رفع IPA**
4. **إعداد صفحة التطبيق**
5. **إرسال للمراجعة**

## 10.4 مراقبة الأداء في الإنتاج

### استخدام Firebase Analytics

\`\`\`dart
import 'package:firebase_analytics/firebase_analytics.dart';

class AnalyticsService {
  static final FirebaseAnalytics _analytics = FirebaseAnalytics.instance;
  
  static Future<void> logEvent(String eventName, Map<String, dynamic> parameters) async {
    await _analytics.logEvent(
      name: eventName,
      parameters: parameters,
    );
  }
  
  static Future<void> setUserProperty(String name, String value) async {
    await _analytics.setUserProperty(name: name, value: value);
  }
}
\`\`\`

### استخدام Crashlytics

\`\`\`dart
import 'package:firebase_crashlytics/firebase_crashlytics.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  
  // تفعيل Crashlytics
  FlutterError.onError = FirebaseCrashlytics.instance.recordFlutterError;
  
  runApp(MyApp());
}

// تسجيل أخطاء مخصصة
void logCustomError(String error, StackTrace stackTrace) {
  FirebaseCrashlytics.instance.recordError(
    error,
    stackTrace,
    reason: 'خطأ مخصص',
  );
}
\`\`\`

فهم هذه العمليات يساعدك على نشر تطبيقات Flutter بنجاح في متاجر التطبيقات.
          `
        }
      ]
    },
    {
      id: 2,
      title: "الأنماط والهيكل المتقدم",
      description: "إتقان التصميم المتجاوب، MVVM، إدارة الحالة، والهيكل النظيف",
      chapters: [
        {
          id: 11,
          title: "التصميم المتجاوب وواجهات المستخدم التكيفية",
          sections: [
            "فهم أحجام الشاشة ونقاط الكسر",
            "التخطيطات المرنة مع Flex و Expanded",
            "MediaQuery و LayoutBuilder",
            "التكيفات الخاصة بالمنصة"
          ],
          readTime: "35 دقيقة",
          content: `
# الفصل الحادي عشر: التصميم المتجاوب وواجهات المستخدم التكيفية

إنشاء تطبيقات تعمل بسلاسة عبر أحجام الشاشات والاتجاهات والمنصات المختلفة أمر أساسي في عالم اليوم متعدد الأجهزة. يوفر Flutter أدوات وأنماط قوية لبناء واجهات مستخدم متجاوبة وتكيفية توفر تجارب مستخدم مثلى بغض النظر عن الجهاز.

## 11.1 فهم أحجام الشاشة ونقاط الكسر

يبدأ التصميم المتجاوب في Flutter بفهم أحجام الشاشات المختلفة وإنشاء نقاط كسر تحدد كيف يجب أن تتكيف واجهة المستخدم الخاصة بك.

### فئات الأجهزة الشائعة

\`\`\`dart
class ScreenSize {
  static const double mobile = 600;
  static const double tablet = 900;
  static const double desktop = 1200;
  
  static bool isMobile(BuildContext context) =>
      MediaQuery.of(context).size.width < mobile;
      
  static bool isTablet(BuildContext context) =>
      MediaQuery.of(context).size.width >= mobile &&
      MediaQuery.of(context).size.width < desktop;
      
  static bool isDesktop(BuildContext context) =>
      MediaQuery.of(context).size.width >= desktop;
}
\`\`\`

## 11.2 التخطيطات المرنة مع Flex و Expanded

widgets الـ Flex في Flutter (Row و Column) مجتمعة مع widgets الـ Expanded و Flexible توفر الأساس للتخطيطات المتجاوبة.

\`\`\`dart
class ResponsiveLayout extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          // رأس ثابت
          Container(
            height: 80,
            color: Colors.blue,
            child: Center(child: Text('الرأس')),
          ),
          // منطقة المحتوى المرنة
          Expanded(
            child: Row(
              children: [
                // الشريط الجانبي (1/4 من العرض على سطح المكتب، مخفي على الهاتف المحمول)
                if (ScreenSize.isDesktop(context))
                  Expanded(
                    flex: 1,
                    child: Container(
                      color: Colors.grey[200],
                      child: Center(child: Text('الشريط الجانبي')),
                    ),
                  ),
                // المحتوى الرئيسي (3/4 على سطح المكتب، العرض الكامل على الهاتف المحمول)
                Expanded(
                  flex: ScreenSize.isDesktop(context) ? 3 : 1,
                  child: Container(
                    color: Colors.white,
                    child: Center(child: Text('المحتوى الرئيسي')),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
\`\`\`

## 11.3 MediaQuery و LayoutBuilder

يوفر MediaQuery معلومات حول الجهاز والشاشة، بينما يعطيك LayoutBuilder قيود الـ widget الأصل.

\`\`\`dart
class AdaptiveCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth > 600) {
          // تخطيط عريض - أفقي
          return Card(
            child: Row(
              children: [
                Expanded(flex: 1, child: _buildImage()),
                Expanded(flex: 2, child: _buildContent()),
              ],
            ),
          );
        } else {
          // تخطيط ضيق - عمودي
          return Card(
            child: Column(
              children: [
                _buildImage(),
                _buildContent(),
              ],
            ),
          );
        }
      },
    );
  }
  
  Widget _buildImage() => Container(
    height: 200,
    color: Colors.blue[100],
    child: Icon(Icons.image, size: 64),
  );
  
  Widget _buildContent() => Padding(
    padding: EdgeInsets.all(16),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('العنوان', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
        SizedBox(height: 8),
        Text('نص الوصف الذي يتكيف مع المساحة المتاحة...'),
      ],
    ),
  );
}
\`\`\`

## 11.4 التكيفات الخاصة بالمنصة

أحياناً تحتاج إلى التكيف ليس فقط مع حجم الشاشة، ولكن مع اتفاقيات وقدرات المنصة.

\`\`\`dart
class PlatformAdaptiveButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  
  const PlatformAdaptiveButton({
    required this.text,
    required this.onPressed,
  });
  
  @override
  Widget build(BuildContext context) {
    if (Theme.of(context).platform == TargetPlatform.iOS) {
      return CupertinoButton(
        onPressed: onPressed,
        child: Text(text),
      );
    } else {
      return ElevatedButton(
        onPressed: onPressed,
        child: Text(text),
      );
    }
  }
}
\`\`\`

التصميم المتجاوب في Flutter يتعلق بإنشاء تخطيطات مرنة تتكيف بأناقة مع أحجام الشاشات والاتجاهات المختلفة، بينما يركز التصميم التكيفي على السلوكيات والاتفاقيات الخاصة بالمنصة. من خلال دمج هذين النهجين، يمكنك إنشاء تطبيقات تبدو native ومصقولة على كل جهاز.
          `
        },
        {
          id: 12,
          title: "هيكل MVVM في Flutter",
          sections: [
            "فهم نمط MVVM",
            "تنفيذ ViewModels",
            "ربط البيانات وإدارة الحالة",
            "اختبار مكونات MVVM"
          ],
          readTime: "40 دقيقة",
          content: `
# الفصل الثاني عشر: هيكل MVVM في Flutter

Model-View-ViewModel (MVVM) هو نمط معماري قوي يعزز فصل الاهتمامات، وقابلية الاختبار، وقابلية الصيانة في تطبيقات Flutter. يستكشف هذا الفصل كيفية تنفيذ MVVM بفعالية في Flutter باستخدام حلول إدارة الحالة الحديثة.

## 12.1 فهم نمط MVVM

يفصل MVVM تطبيقك إلى ثلاث طبقات متميزة:

- **Model**: البيانات ومنطق الأعمال
- **View**: مكونات واجهة المستخدم (Widgets)
- **ViewModel**: يتوسط بين Model و View، يحتوي على منطق العرض

### فوائد MVVM في Flutter

\`\`\`dart
// النهج التقليدي - مقترن بإحكام
class UserProfilePage extends StatefulWidget {
  @override
  _UserProfilePageState createState() => _UserProfilePageState();
}

class _UserProfilePageState extends State<UserProfilePage> {
  User? user;
  bool isLoading = false;
  
  @override
  void initState() {
    super.initState();
    _loadUser(); // منطق الأعمال مختلط مع واجهة المستخدم
  }
  
  Future<void> _loadUser() async {
    setState(() => isLoading = true);
    // استدعاء API مباشر في طبقة واجهة المستخدم
    user = await ApiService.getUser();
    setState(() => isLoading = false);
  }
  
  @override
  Widget build(BuildContext context) {
    // كود واجهة المستخدم مختلط مع إدارة الحالة
    return Scaffold(/* ... */);
  }
}
\`\`\`

## 12.2 تنفيذ ViewModels

يمكن تنفيذ ViewModels في Flutter باستخدام حلول إدارة الحالة المختلفة. إليك مثال باستخدام Provider:

\`\`\`dart
// Model
class User {
  final String id;
  final String name;
  final String email;
  final String avatarUrl;
  
  User({
    required this.id,
    required this.name,
    required this.email,
    required this.avatarUrl,
  });
  
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      avatarUrl: json['avatarUrl'],
    );
  }
}

// ViewModel
class UserProfileViewModel extends ChangeNotifier {
  final UserRepository _userRepository;
  
  UserProfileViewModel(this._userRepository);
  
  User? _user;
  bool _isLoading = false;
  String? _errorMessage;
  
  // Getters للـ View للوصول إلى الحالة
  User? get user => _user;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  bool get hasError => _errorMessage != null;
  
  // Commands للـ View لتشغيل الإجراءات
  Future<void> loadUser(String userId) async {
    _setLoading(true);
    _clearError();
    
    try {
      _user = await _userRepository.getUser(userId);
    } catch (e) {
      _errorMessage = 'فشل في تحميل المستخدم: \${e.toString()}';
    } finally {
      _setLoading(false);
    }
  }
  
  Future<void> updateUser(User updatedUser) async {
    _setLoading(true);
    _clearError();
    
    try {
      _user = await _userRepository.updateUser(updatedUser);
    } catch (e) {
      _errorMessage = 'فشل في تحديث المستخدم: \${e.toString()}';
    } finally {
      _setLoading(false);
    }
  }
  
  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }
  
  void _clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}
\`\`\`

## 12.3 ربط البيانات وإدارة الحالة

طبقة الـ View ترتبط بالـ ViewModel وتتفاعل مع تغييرات الحالة:

\`\`\`dart
// View
class UserProfilePage extends StatelessWidget {
  final String userId;
  
  const UserProfilePage({required this.userId});
  
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => UserProfileViewModel(
        context.read<UserRepository>(),
      )..loadUser(userId),
      child: Scaffold(
        appBar: AppBar(title: Text('ملف المستخدم')),
        body: Consumer<UserProfileViewModel>(
          builder: (context, viewModel, child) {
            if (viewModel.isLoading) {
              return Center(child: CircularProgressIndicator());
            }
            
            if (viewModel.hasError) {
              return Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(viewModel.errorMessage!),
                    ElevatedButton(
                      onPressed: () => viewModel.loadUser(userId),
                      child: Text('إعادة المحاولة'),
                    ),
                  ],
                ),
              );
            }
            
            if (viewModel.user == null) {
              return Center(child: Text('لم يتم العثور على مستخدم'));
            }
            
            return _buildUserProfile(context, viewModel);
          },
        ),
      ),
    );
  }
  
  Widget _buildUserProfile(BuildContext context, UserProfileViewModel viewModel) {
    final user = viewModel.user!;
    
    return Padding(
      padding: EdgeInsets.all(16),
      child: Column(
        children: [
          CircleAvatar(
            radius: 50,
            backgroundImage: NetworkImage(user.avatarUrl),
          ),
          SizedBox(height: 16),
          Text(
            user.name,
            style: Theme.of(context).textTheme.headlineSmall,
          ),
          Text(
            user.email,
            style: Theme.of(context).textTheme.bodyLarge,
          ),
          SizedBox(height: 32),
          ElevatedButton(
            onPressed: () => _showEditDialog(context, viewModel, user),
            child: Text('تعديل الملف الشخصي'),
          ),
        ],
      ),
    );
  }
  
  void _showEditDialog(BuildContext context, UserProfileViewModel viewModel, User user) {
    // تنفيذ حوار التعديل
  }
}
\`\`\`

## 12.4 اختبار مكونات MVVM

هيكل MVVM يجعل الاختبار أسهل بكثير من خلال فصل الاهتمامات:

\`\`\`dart
// اختبار ViewModel
class MockUserRepository extends Mock implements UserRepository {}

void main() {
  group('UserProfileViewModel', () {
    late MockUserRepository mockRepository;
    late UserProfileViewModel viewModel;
    
    setUp(() {
      mockRepository = MockUserRepository();
      viewModel = UserProfileViewModel(mockRepository);
    });
    
    test('يجب تحميل المستخدم بنجاح', () async {
      // ترتيب
      final user = User(
        id: '1',
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
      );
      when(mockRepository.getUser('1')).thenAnswer((_) async => user);
      
      // تنفيذ
      await viewModel.loadUser('1');
      
      // تأكيد
      expect(viewModel.user, equals(user));
      expect(viewModel.isLoading, false);
      expect(viewModel.hasError, false);
    });
    
    test('يجب التعامل مع خطأ تحميل المستخدم', () async {
      // ترتيب
      when(mockRepository.getUser('1')).thenThrow(Exception('خطأ في الشبكة'));
      
      // تنفيذ
      await viewModel.loadUser('1');
      
      // تأكيد
      expect(viewModel.user, isNull);
      expect(viewModel.isLoading, false);
      expect(viewModel.hasError, true);
      expect(viewModel.errorMessage, contains('خطأ في الشبكة'));
    });
  });
}
\`\`\`

هيكل MVVM في Flutter يعزز كود نظيف وقابل للاختبار وقابل للصيانة من خلال فصل منطق العرض بوضوح عن مكونات واجهة المستخدم ومنطق الأعمال. هذا الفصل يجعل كودك أسهل للفهم والاختبار والتعديل مع نمو تطبيقك.
          `
        },
        {
          id: 13,
          title: "التنقل المتقدم والتوجيه",
          sections: [
            "انتقالات المسار المخصصة",
            "الروابط العميقة وإدارة URL",
            "إدارة حالة التنقل",
            "أنماط التنقل المعقدة"
          ],
          readTime: "35 دقيقة",
          content: `
# الفصل الثالث عشر: التنقل المتقدم والتوجيه

التنقل هو جانب أساسي من أي تطبيق للهاتف المحمول. يوفر Flutter نظام تنقل قوي يمكنه التعامل مع سيناريوهات التوجيه المعقدة والروابط العميقة والانتقالات المخصصة.

## 13.1 انتقالات المسار المخصصة

يسمح نظام التنقل في Flutter بإنشاء انتقالات مسار مخصصة تعزز تجربة المستخدم.

\`\`\`dart
class CustomPageRoute extends PageRouteBuilder {
  final Widget child;
  
  CustomPageRoute({required this.child})
      : super(
          pageBuilder: (context, animation, secondaryAnimation) => child,
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            return SlideTransition(
              position: Tween<Offset>(
                begin: const Offset(1.0, 0.0),
                end: Offset.zero,
              ).animate(animation),
              child: child,
            );
          },
        );
}

// الاستخدام
Navigator.push(
  context,
  CustomPageRoute(child: DetailPage()),
);
\`\`\`

## 13.2 الروابط العميقة وإدارة URL

تسمح الروابط العميقة للمستخدمين بالتنقل مباشرة إلى محتوى محدد داخل تطبيقك.

\`\`\`dart
class DeepLinkHandler {
  static void handleDeepLink(String link) {
    final uri = Uri.parse(link);
    final path = uri.path;
    
    switch (path) {
      case '/product':
        final productId = uri.queryParameters['id'];
        Navigator.pushNamed(context, '/product', arguments: productId);
        break;
      case '/category':
        final categoryId = uri.queryParameters['id'];
        Navigator.pushNamed(context, '/category', arguments: categoryId);
        break;
    }
  }
}
\`\`\`

## 13.3 إدارة حالة التنقل

إدارة حالة التنقل أمر بالغ الأهمية للتطبيقات المعقدة.

\`\`\`dart
class NavigationService {
  static final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();
  
  static Future<dynamic> navigateTo(String routeName, {Object? arguments}) {
    return navigatorKey.currentState!.pushNamed(routeName, arguments: arguments);
  }
  
  static void goBack() {
    navigatorKey.currentState!.pop();
  }
}

// الاستخدام في main.dart
MaterialApp(
  navigatorKey: NavigationService.navigatorKey,
  // ... خصائص أخرى
)
\`\`\`

## 13.4 أنماط التنقل المعقدة

أنماط التنقل المتقدمة للتطبيقات المعقدة.

\`\`\`dart
class BottomNavigationWithNestedRoutes extends StatefulWidget {
  @override
  _BottomNavigationWithNestedRoutesState createState() => _BottomNavigationWithNestedRoutesState();
}

class _BottomNavigationWithNestedRoutesState extends State<BottomNavigationWithNestedRoutes> {
  int _currentIndex = 0;
  
  final List<Widget> _pages = [
    HomePage(),
    SearchPage(),
    ProfilePage(),
  ];
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _pages,
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        items: [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'الرئيسية'),
          BottomNavigationBarItem(icon: Icon(Icons.search), label: 'البحث'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'الملف الشخصي'),
        ],
      ),
    );
  }
}
\`\`\`

أنماط التنقل المتقدمة تساعد في إنشاء تجارب مستخدم بديهية وفعالة في تطبيقات Flutter.
          `
        },
        {
          id: 14,
          title: "العناصر المخصصة والقابلية للتركيب",
          sections: [
            "بناء العناصر القابلة لإعادة الاستخدام",
            "أنماط تركيب العناصر",
            "الرسم المخصص والـ Canvas",
            "تحسين الأداء للعناصر المخصصة"
          ],
          readTime: "40 دقيقة",
          content: `
# الفصل الرابع عشر: العناصر المخصصة والقابلية للتركيب

إنشاء العناصر المخصصة أمر أساسي لبناء تطبيقات Flutter قابلة للصيانة وإعادة الاستخدام. يستكشف هذا الفصل التقنيات المتقدمة لبناء العناصر المخصصة وتحسين أدائها.

## 14.1 بناء العناصر القابلة لإعادة الاستخدام

العناصر القابلة لإعادة الاستخدام هي أساس كود Flutter القابل للصيانة.

\`\`\`dart
class CustomButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final Color? backgroundColor;
  final Color? textColor;
  
  const CustomButton({
    Key? key,
    required this.text,
    required this.onPressed,
    this.backgroundColor,
    this.textColor,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: backgroundColor ?? Theme.of(context).primaryColor,
        foregroundColor: textColor ?? Colors.white,
        padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
      child: Text(text),
    );
  }
}

// الاستخدام
CustomButton(
  text: 'اضغط علي',
  onPressed: () => print('تم الضغط على الزر'),
  backgroundColor: Colors.blue,
)
\`\`\`

## 14.2 أنماط تركيب العناصر

التركيب أفضل من الوراثة هو مبدأ أساسي في Flutter.

\`\`\`dart
class CardWidget extends StatelessWidget {
  final Widget child;
  final EdgeInsets? padding;
  final Color? backgroundColor;
  final double? elevation;
  
  const CardWidget({
    Key? key,
    required this.child,
    this.padding,
    this.backgroundColor,
    this.elevation,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: elevation ?? 2,
      color: backgroundColor,
      child: Padding(
        padding: padding ?? EdgeInsets.all(16),
        child: child,
      ),
    );
  }
}

// الاستخدام مع التركيب
CardWidget(
  child: Column(
    children: [
      Text('العنوان'),
      Text('الوصف'),
    ],
  ),
)
\`\`\`

## 14.3 الرسم المخصص والـ Canvas

الرسم المخصص يسمح لك بإنشاء تأثيرات بصرية فريدة.

\`\`\`dart
class CustomPainterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      painter: MyCustomPainter(),
      child: Container(
        width: 200,
        height: 200,
      ),
    );
  }
}

class MyCustomPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.blue
      ..style = PaintingStyle.fill;
    
    canvas.drawCircle(
      Offset(size.width / 2, size.height / 2),
      50,
      paint,
    );
  }
  
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
\`\`\`

## 14.4 تحسين الأداء للعناصر المخصصة

تحسين العناصر المخصصة للأداء أمر بالغ الأهمية.

\`\`\`dart
class OptimizedWidget extends StatelessWidget {
  final String title;
  final String description;
  
  const OptimizedWidget({
    Key? key,
    required this.title,
    required this.description,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(title, style: Theme.of(context).textTheme.headline6),
        Text(description, style: Theme.of(context).textTheme.bodyText2),
      ],
    );
  }
}

// الاستخدام مع const constructor
const OptimizedWidget(
  title: 'عنواني',
  description: 'وصفي',
)
\`\`\`

العناصر المخصصة وأنماط التركيب تمكنك من إنشاء تطبيقات Flutter مرنة وقابلة للصيانة وعالية الأداء.
          `
        },
        {
          id: 15,
          title: "التدويل والتعريب",
          sections: [
            "إعداد i18n في Flutter",
            "إدارة الترجمات",
            "دعم اللغات من اليمين إلى اليسار",
            "تبديل اللغة الديناميكي"
          ],
          readTime: "30 دقيقة",
          content: `
# الفصل الخامس عشر: التدويل والتعريب

التدويل (i18n) والتعريب (l10n) أمران أساسيان لإنشاء تطبيقات يمكنها خدمة المستخدمين في جميع أنحاء العالم. يوفر Flutter دعماً ممتازاً للغات والثقافات المتعددة.

## 15.1 إعداد i18n في Flutter

نظام التدويل في Flutter مبني على حزمة intl.

\`\`\`dart
// pubspec.yaml
dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
  intl: ^0.18.0

// main.dart
import 'package:flutter_localizations/flutter_localizations.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      localizationsDelegates: [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: [
        const Locale('en', 'US'),
        const Locale('es', 'ES'),
        const Locale('ar', 'SA'),
      ],
      home: HomePage(),
    );
  }
}
\`\`\`

## 15.2 إدارة الترجمات

تنظيم الترجمات بكفاءة أمر بالغ الأهمية للقابلية للصيانة.

\`\`\`dart
// l10n/app_en.arb
{
  "helloWorld": "Hello World",
  "@helloWorld": {
    "description": "A greeting message"
  },
  "welcomeMessage": "Welcome, {name}",
  "@welcomeMessage": {
    "description": "A welcome message with parameter",
    "placeholders": {
      "name": {
        "type": "String"
      }
    }
  }
}

// l10n/app_ar.arb
{
  "helloWorld": "مرحباً بالعالم",
  "welcomeMessage": "مرحباً، {name}"
}

// الاستخدام في الكود
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Text(AppLocalizations.of(context)!.helloWorld);
  }
}
\`\`\`

## 15.3 دعم اللغات من اليمين إلى اليسار

دعم اللغة من اليمين إلى اليسار أمر أساسي للغات مثل العربية والعبرية.

\`\`\`dart
class RTLWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Row(
        children: [
          Icon(Icons.arrow_back),
          Text('رجوع'),
        ],
      ),
    );
  }
}

// الكشف التلقائي عن RTL
class AutoRTLWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final locale = Localizations.localeOf(context);
    final isRTL = locale.languageCode == 'ar' || locale.languageCode == 'he';
    
    return Directionality(
      textDirection: isRTL ? TextDirection.rtl : TextDirection.ltr,
      child: YourWidget(),
    );
  }
}
\`\`\`

## 15.4 تبديل اللغة الديناميكي

السماح للمستخدمين بتغيير اللغة في وقت التشغيل.

\`\`\`dart
class LanguageProvider extends ChangeNotifier {
  Locale _locale = Locale('en');
  
  Locale get locale => _locale;
  
  void setLocale(Locale locale) {
    _locale = locale;
    notifyListeners();
  }
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => LanguageProvider(),
      child: Consumer<LanguageProvider>(
        builder: (context, provider, child) {
          return MaterialApp(
            locale: provider.locale,
            localizationsDelegates: [
              GlobalMaterialLocalizations.delegate,
              GlobalWidgetsLocalizations.delegate,
              AppLocalizations.delegate,
            ],
            supportedLocales: [
              Locale('en'),
              Locale('es'),
              Locale('ar'),
            ],
            home: HomePage(),
          );
        },
      ),
    );
  }
}
\`\`\`

التدويل المناسب يضمن أن تطبيقك يمكنه الوصول إلى جمهور عالمي بشكل فعال.
          `
        },
        {
          id: 16,
          title: "أفضل ممارسات الأمان",
          sections: [
            "تخزين البيانات الآمن",
            "أمان الشبكة",
            "إخفاء الكود",
            "الأمان المخصص للمنصة"
          ],
          readTime: "35 دقيقة",
          content: `
# الفصل السادس عشر: أفضل ممارسات الأمان

الأمان أمر بالغ الأهمية في تطوير تطبيقات الهاتف المحمول. يغطي هذا الفصل الممارسات الأمنية الأساسية لتطبيقات Flutter، من تخزين البيانات إلى الاتصال بالشبكة.

## 16.1 تخزين البيانات الآمن

حماية البيانات الحساسة أمر بالغ الأهمية لخصوصية المستخدم والامتثال.

\`\`\`dart
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorageService {
  static const FlutterSecureStorage _storage = FlutterSecureStorage();
  
  static Future<void> saveToken(String token) async {
    await _storage.write(key: 'auth_token', value: token);
  }
  
  static Future<String?> getToken() async {
    return await _storage.read(key: 'auth_token');
  }
  
  static Future<void> deleteToken() async {
    await _storage.delete(key: 'auth_token');
  }
  
  static Future<void> saveUserData(Map<String, dynamic> userData) async {
    final jsonString = jsonEncode(userData);
    await _storage.write(key: 'user_data', value: jsonString);
  }
  
  static Future<Map<String, dynamic>?> getUserData() async {
    final jsonString = await _storage.read(key: 'user_data');
    if (jsonString != null) {
      return jsonDecode(jsonString);
    }
    return null;
  }
}
\`\`\`

## 16.2 أمان الشبكة

تأمين الاتصالات الشبكية أمر أساسي لحماية البيانات أثناء النقل.

\`\`\`dart
import 'package:dio/dio.dart';
import 'package:dio/io.dart';

class SecureApiService {
  late Dio _dio;
  
  SecureApiService() {
    _dio = Dio();
    
    // تكوين SSL pinning
    (_dio.httpClientAdapter as DefaultHttpClientAdapter).onHttpClientCreate =
        (HttpClient client) {
      client.badCertificateCallback = (cert, host, port) {
        // تنفيذ منطق certificate pinning
        return _isValidCertificate(cert, host);
      };
      return client;
    };
    
    // إضافة headers الأمان
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) {
        options.headers['X-API-Key'] = 'your-api-key';
        options.headers['User-Agent'] = 'YourApp/1.0';
        handler.next(options);
      },
    ));
  }
  
  bool _isValidCertificate(X509Certificate cert, String host) {
    // تنفيذ منطق التحقق من الشهادة
    return cert.subject.contains('your-domain.com');
  }
  
  Future<dynamic> secureGet(String url) async {
    try {
      final response = await _dio.get(url);
      return response.data;
    } on DioException catch (e) {
      throw SecurityException('خطأ في أمان الشبكة: \${e.message}');
    }
  }
}
\`\`\`

## 16.3 إخفاء الكود

حماية كودك من الهندسة العكسية.

\`\`\`yaml
# pubspec.yaml
flutter:
  obfuscate: true
  split-debug-info: build/debug-info

# أمر البناء
flutter build apk --release --obfuscate --split-debug-info=build/debug-info
\`\`\`

\`\`\`dart
// قواعد ProGuard لـ Android
-keep class io.flutter.app.** { *; }
-keep class io.flutter.plugin.** { *; }
-keep class io.flutter.util.** { *; }
-keep class io.flutter.view.** { *; }
-keep class io.flutter.** { *; }
-keep class io.flutter.plugins.** { *; }

// احتفظ بفئاتك الحساسة
-keep class com.example.myapp.SensitiveClass { *; }
\`\`\`

## 16.4 الأمان المخصص للمنصة

المنصات المختلفة تتطلب نهج أمان مختلفة.

\`\`\`dart
// الأمان المخصص لـ Android
import 'package:flutter/services.dart';

class AndroidSecurity {
  static const MethodChannel _channel = MethodChannel('security_channel');
  
  static Future<void> enableBiometricAuth() async {
    try {
      await _channel.invokeMethod('enableBiometricAuth');
    } on PlatformException catch (e) {
      print('خطأ في المصادقة البيومترية: \${e.message}');
    }
  }
  
  static Future<bool> isDeviceSecure() async {
    try {
      final result = await _channel.invokeMethod('isDeviceSecure');
      return result as bool;
    } on PlatformException catch (e) {
      return false;
    }
  }
}

// الأمان المخصص لـ iOS
class IOSSecurity {
  static const MethodChannel _channel = MethodChannel('security_channel');
  
  static Future<void> enableKeychainAccess() async {
    try {
      await _channel.invokeMethod('enableKeychainAccess');
    } on PlatformException catch (e) {
      print('خطأ في الوصول إلى Keychain: \${e.message}');
    }
  }
}
\`\`\`

## 16.5 ملخص أفضل ممارسات الأمان

1. **لا تخزن البيانات الحساسة كنص عادي أبداً**
2. **استخدم HTTPS لجميع الاتصالات الشبكية**
3. **نفذ certificate pinning**
4. **أخف كودك لـ release builds**
5. **تحقق من جميع مدخلات المستخدم**
6. **استخدم ميزات الأمان المخصصة للمنصة**
7. **حدث التبعيات بانتظام**
8. **نفذ معالجة الأخطاء المناسبة**

يجب أن يكون الأمان اعتباراً أساسياً في كل جانب من جوانب تطوير تطبيق Flutter الخاص بك.
          `
        },
        {
          id: 17,
          title: "تقنيات الرسوم المتحركة المتقدمة",
          sections: [
            "تسلسلات الرسوم المتحركة المعقدة",
            "منحنيات الرسوم المتحركة المخصصة",
            "رسوم Hero المتحركة",
            "تحسين الأداء للرسوم المتحركة"
          ],
          readTime: "40 دقيقة",
          content: `
# الفصل السابع عشر: تقنيات الرسوم المتحركة المتقدمة

يمكن للرسوم المتحركة المتقدمة أن تعزز بشكل كبير تجربة المستخدم وتجعل تطبيقات Flutter الخاصة بك تبدو أكثر احترافية ومصقولة. يستكشف هذا الفصل تقنيات الرسوم المتحركة المتقدمة واستراتيجيات تحسين الأداء.

## 17.1 تسلسلات الرسوم المتحركة المعقدة

إنشاء تسلسلات رسوم متحركة منسقة يتطلب تخطيطاً وتنفيذاً دقيقين.

\`\`\`dart
class ComplexAnimationWidget extends StatefulWidget {
  @override
  _ComplexAnimationWidgetState createState() => _ComplexAnimationWidgetState();
}

class _ComplexAnimationWidgetState extends State<ComplexAnimationWidget>
    with TickerProviderStateMixin {
  late AnimationController _mainController;
  late AnimationController _secondaryController;
  
  late Animation<double> _scaleAnimation;
  late Animation<double> _rotationAnimation;
  late Animation<Color?> _colorAnimation;
  late Animation<Offset> _slideAnimation;
  
  @override
  void initState() {
    super.initState();
    
    _mainController = AnimationController(
      duration: Duration(seconds: 2),
      vsync: this,
    );
    
    _secondaryController = AnimationController(
      duration: Duration(milliseconds: 500),
      vsync: this,
    );
    
    // إنشاء رسوم متحركة منسقة
    _scaleAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _mainController,
      curve: Interval(0.0, 0.5, curve: Curves.elasticOut),
    ));
    
    _rotationAnimation = Tween<double>(
      begin: 0.0,
      end: 2 * pi,
    ).animate(CurvedAnimation(
      parent: _mainController,
      curve: Interval(0.2, 0.8, curve: Curves.easeInOut),
    ));
    
    _colorAnimation = ColorTween(
      begin: Colors.red,
      end: Colors.blue,
    ).animate(CurvedAnimation(
      parent: _mainController,
      curve: Interval(0.5, 1.0, curve: Curves.easeIn),
    ));
    
    _slideAnimation = Tween<Offset>(
      begin: Offset(0, 1),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _mainController,
      curve: Interval(0.3, 0.7, curve: Curves.bounceOut),
    ));
  }
  
  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _mainController,
      builder: (context, child) {
        return Transform.scale(
          scale: _scaleAnimation.value,
          child: Transform.rotate(
            angle: _rotationAnimation.value,
            child: SlideTransition(
              position: _slideAnimation,
              child: Container(
                width: 100,
                height: 100,
                decoration: BoxDecoration(
                  color: _colorAnimation.value,
                  borderRadius: BorderRadius.circular(50),
                ),
              ),
            ),
          ),
        );
      },
    );
  }
  
  @override
  void dispose() {
    _mainController.dispose();
    _secondaryController.dispose();
    super.dispose();
  }
}
\`\`\`

## 17.2 منحنيات الرسوم المتحركة المخصصة

إنشاء منحنيات رسوم متحركة مخصصة يسمح بسلوكيات رسوم متحركة فريدة.

\`\`\`dart
class CustomCurve extends Curve {
  @override
  double transform(double t) {
    // منحنى مخصص: يبدأ ببطء، يتسارع في الوسط، يبطئ في النهاية
    return t * t * (3.0 - 2.0 * t);
  }
}

class BounceCurve extends Curve {
  final double intensity;
  
  BounceCurve({this.intensity = 1.0});
  
  @override
  double transform(double t) {
    return 1.0 - intensity * (1.0 - t) * (1.0 - t);
  }
}

// الاستخدام
Animation<double> customAnimation = Tween<double>(
  begin: 0.0,
  end: 1.0,
).animate(CurvedAnimation(
  parent: controller,
  curve: CustomCurve(),
));
\`\`\`

## 17.3 رسوم Hero المتحركة

رسوم Hero المتحركة تنشئ انتقالات سلسة بين الشاشات.

\`\`\`dart
// الشاشة الأولى
class FirstScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Hero(
          tag: 'sharedElement',
          child: Container(
            width: 100,
            height: 100,
            decoration: BoxDecoration(
              color: Colors.blue,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Icon(Icons.star, color: Colors.white),
          ),
        ),
      ),
    );
  }
}

// الشاشة الثانية
class SecondScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('التفاصيل')),
      body: Center(
        child: Hero(
          tag: 'sharedElement',
          child: Container(
            width: 200,
            height: 200,
            decoration: BoxDecoration(
              color: Colors.blue,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Icon(Icons.star, color: Colors.white, size: 50),
          ),
        ),
      ),
    );
  }
}

// التنقل مع انتقال مخصص
Navigator.push(
  context,
  PageRouteBuilder(
    pageBuilder: (context, animation, secondaryAnimation) => SecondScreen(),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      return FadeTransition(
        opacity: animation,
        child: child,
      );
    },
  ),
);
\`\`\`

## 17.4 تحسين الأداء للرسوم المتحركة

تحسين الرسوم المتحركة أمر بالغ الأهمية للحفاظ على الأداء السلس.

\`\`\`dart
class OptimizedAnimationWidget extends StatefulWidget {
  @override
  _OptimizedAnimationWidgetState createState() => _OptimizedAnimationWidgetState();
}

class _OptimizedAnimationWidgetState extends State<OptimizedAnimationWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(seconds: 1),
      vsync: this,
    );
    _animation = Tween<double>(begin: 0, end: 1).animate(_controller);
  }
  
  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        // استخدم RepaintBoundary لتحسين إعادة الرسم
        return RepaintBoundary(
          child: Transform.scale(
            scale: _animation.value,
            child: Container(
              width: 100,
              height: 100,
              color: Colors.blue,
            ),
          ),
        );
      },
    );
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}

// مراقبة الأداء
class AnimationPerformanceMonitor {
  static void measureAnimationPerformance(String name, Function() animation) {
    final stopwatch = Stopwatch()..start();
    animation();
    stopwatch.stop();
    
    if (kDebugMode) {
      print('\$name استغرق \${stopwatch.elapsedMilliseconds}ms');
    }
  }
}
\`\`\`

## 17.5 أفضل ممارسات الرسوم المتحركة

1. **استخدم const constructors** للعناصر الثابتة
2. **نفذ طرق dispose المناسبة** لمنع تسرب الذاكرة
3. **استخدم RepaintBoundary** للرسوم المتحركة المعقدة
4. **راقب معدلات الإطارات** أثناء التطوير
5. **اختبر على الأجهزة منخفضة الأداء** لضمان الأداء
6. **استخدم المنحنيات المناسبة** للحركة الطبيعية
7. **تجنب الرسوم المتحركة المتداخلة** عندما يكون ذلك ممكناً
8. **حلل الرسوم المتحركة** باستخدام Flutter DevTools

يمكن لتقنيات الرسوم المتحركة المتقدمة أن تحول تطبيقات Flutter الخاصة بك إلى تجارب جذابة واحترافية تسعد المستخدمين.
          `
        },
        {
          id: 19,
          title: "أنماط إدارة الحالة المتقدمة",
          sections: [
            "هندسة Multi-Provider",
            "استراتيجيات استمرارية الحالة",
            "مزامنة الحالة المعقدة",
            "اختبار إدارة الحالة المتقدمة"
          ],
          readTime: "45 دقيقة",
          content: `
# الفصل التاسع عشر: أنماط إدارة الحالة المتقدمة

مع نمو التطبيقات في التعقيد، تصبح إدارة الحالة أكثر تحدياً. يستكشف هذا الفصل أنماط إدارة الحالة المتقدمة واستراتيجيات التعامل مع حالة التطبيق المعقدة.

## 19.1 هندسة Multi-Provider

إدارة multiple providers بكفاءة أمر بالغ الأهمية للتطبيقات المعقدة.

\`\`\`dart
class AppState extends ChangeNotifier {
  UserState _userState = UserState();
  ThemeState _themeState = ThemeState();
  NavigationState _navigationState = NavigationState();
  
  UserState get userState => _userState;
  ThemeState get themeState => _themeState;
  NavigationState get navigationState => _navigationState;
  
  void updateUser(User user) {
    _userState.updateUser(user);
    notifyListeners();
  }
  
  void toggleTheme() {
    _themeState.toggleTheme();
    notifyListeners();
  }
  
  void updateNavigation(String route) {
    _navigationState.updateRoute(route);
    notifyListeners();
  }
}

class UserState {
  User? _user;
  bool _isLoading = false;
  
  User? get user => _user;
  bool get isLoading => _isLoading;
  
  void updateUser(User user) {
    _user = user;
  }
  
  void setLoading(bool loading) {
    _isLoading = loading;
  }
}

class ThemeState {
  bool _isDarkMode = false;
  
  bool get isDarkMode => _isDarkMode;
  
  void toggleTheme() {
    _isDarkMode = !_isDarkMode;
  }
}

class NavigationState {
  String _currentRoute = '/';
  
  String get currentRoute => _currentRoute;
  
  void updateRoute(String route) {
    _currentRoute = route;
  }
}

// الاستخدام مع MultiProvider
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AppState()),
        ChangeNotifierProvider(create: (_) => AuthService()),
        ChangeNotifierProvider(create: (_) => ApiService()),
      ],
      child: MaterialApp(
        home: HomePage(),
      ),
    );
  }
}
\`\`\`

## 19.2 استراتيجيات استمرارية الحالة

استمرارية الحالة عبر جلسات التطبيق أمر أساسي لتجربة المستخدم.

\`\`\`dart
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class PersistentStateManager extends ChangeNotifier {
  static const String _userKey = 'user_data';
  static const String _settingsKey = 'app_settings';
  static const String _themeKey = 'theme_preference';
  
  User? _user;
  AppSettings _settings = AppSettings();
  bool _isDarkMode = false;
  
  User? get user => _user;
  AppSettings get settings => _settings;
  bool get isDarkMode => _isDarkMode;
  
  Future<void> loadPersistedState() async {
    final prefs = await SharedPreferences.getInstance();
    
    // تحميل بيانات المستخدم
    final userJson = prefs.getString(_userKey);
    if (userJson != null) {
      _user = User.fromJson(jsonDecode(userJson));
    }
    
    // تحميل الإعدادات
    final settingsJson = prefs.getString(_settingsKey);
    if (settingsJson != null) {
      _settings = AppSettings.fromJson(jsonDecode(settingsJson));
    }
    
    // تحميل تفضيل السمة
    _isDarkMode = prefs.getBool(_themeKey) ?? false;
    
    notifyListeners();
  }
  
  Future<void> saveUser(User user) async {
    _user = user;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_userKey, jsonEncode(user.toJson()));
    notifyListeners();
  }
  
  Future<void> saveSettings(AppSettings settings) async {
    _settings = settings;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_settingsKey, jsonEncode(settings.toJson()));
    notifyListeners();
  }
  
  Future<void> saveThemePreference(bool isDarkMode) async {
    _isDarkMode = isDarkMode;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_themeKey, isDarkMode);
    notifyListeners();
  }
  
  Future<void> clearAllData() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
    _user = null;
    _settings = AppSettings();
    _isDarkMode = false;
    notifyListeners();
  }
}

class AppSettings {
  final bool notificationsEnabled;
  final String language;
  final bool autoSave;
  
  AppSettings({
    this.notificationsEnabled = true,
    this.language = 'en',
    this.autoSave = true,
  });
  
  AppSettings copyWith({
    bool? notificationsEnabled,
    String? language,
    bool? autoSave,
  }) {
    return AppSettings(
      notificationsEnabled: notificationsEnabled ?? this.notificationsEnabled,
      language: language ?? this.language,
      autoSave: autoSave ?? this.autoSave,
    );
  }
  
  Map<String, dynamic> toJson() {
    return {
      'notificationsEnabled': notificationsEnabled,
      'language': language,
      'autoSave': autoSave,
    };
  }
  
  factory AppSettings.fromJson(Map<String, dynamic> json) {
    return AppSettings(
      notificationsEnabled: json['notificationsEnabled'] ?? true,
      language: json['language'] ?? 'en',
      autoSave: json['autoSave'] ?? true,
    );
  }
}
\`\`\`

## 19.3 مزامنة الحالة المعقدة

مزامنة الحالة عبر مكونات وخدمات متعددة.

\`\`\`dart
class SynchronizedStateManager extends ChangeNotifier {
  final Map<String, dynamic> _state = {};
  final List<Function> _listeners = [];
  
  void setState(String key, dynamic value) {
    _state[key] = value;
    _notifyListeners();
  }
  
  T? getState<T>(String key) {
    return _state[key] as T?;
  }
  
  void addListener(Function listener) {
    _listeners.add(listener);
  }
  
  void removeListener(Function listener) {
    _listeners.remove(listener);
  }
  
  void _notifyListeners() {
    for (final listener in _listeners) {
      listener();
    }
    notifyListeners();
  }
  
  // المزامنة مع الخدمات الخارجية
  Future<void> syncWithServer() async {
    try {
      final response = await ApiService.getState();
      _state.addAll(response);
      _notifyListeners();
    } catch (e) {
      print('فشل في المزامنة مع الخادم: \$e');
    }
  }
  
  Future<void> syncToServer() async {
    try {
      await ApiService.updateState(_state);
    } catch (e) {
      print('فشل في المزامنة إلى الخادم: \$e');
    }
  }
}

// الاستخدام مع عناصر متعددة
class WidgetA extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<SynchronizedStateManager>(
      builder: (context, stateManager, child) {
        final value = stateManager.getState<String>('key');
        return Text(value ?? 'لا توجد قيمة');
      },
    );
  }
}

class WidgetB extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<SynchronizedStateManager>(
      builder: (context, stateManager, child) {
        return ElevatedButton(
          onPressed: () => stateManager.setState('key', 'قيمة جديدة'),
          child: Text('تحديث الحالة'),
        );
      },
    );
  }
}
\`\`\`

## 19.4 اختبار إدارة الحالة المتقدمة

اختبار إدارة الحالة المعقدة يتطلب تخطيطاً دقيقاً و mocking.

\`\`\`dart
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

class MockApiService extends Mock implements ApiService {}

void main() {
  group('اختبارات إدارة الحالة المتقدمة', () {
    late SynchronizedStateManager stateManager;
    late MockApiService mockApiService;
    
    setUp(() {
      stateManager = SynchronizedStateManager();
      mockApiService = MockApiService();
    });
    
    test('يجب أن يحدث الحالة ويخطر المستمعين', () {
      // الترتيب
      bool listenerCalled = false;
      stateManager.addListener(() => listenerCalled = true);
      
      // الفعل
      stateManager.setState('test_key', 'test_value');
      
      // التأكيد
      expect(stateManager.getState<String>('test_key'), equals('test_value'));
      expect(listenerCalled, isTrue);
    });
    
    test('يجب أن يزامن مع الخادم بنجاح', () async {
      // الترتيب
      when(mockApiService.getState()).thenAnswer((_) async => {
        'server_key': 'server_value'
      });
      
      // الفعل
      await stateManager.syncWithServer();
      
      // التأكيد
      expect(stateManager.getState<String>('server_key'), equals('server_value'));
      verify(mockApiService.getState()).called(1);
    });
    
    test('يجب أن يتعامل مع أخطاء المزامنة بأدب', () async {
      // الترتيب
      when(mockApiService.getState()).thenThrow(Exception('خطأ في الشبكة'));
      
      // الفعل والتأكيد
      expect(() => stateManager.syncWithServer(), returnsNormally);
    });
  });
}

// اختبار التكامل
void main() {
  group('اختبارات تكامل إدارة الحالة', () {
    testWidgets('يجب أن يحدث واجهة المستخدم عند تغيير الحالة', (WidgetTester tester) async {
      // الترتيب
      final stateManager = SynchronizedStateManager();
      
      // الفعل
      await tester.pumpWidget(
        ChangeNotifierProvider.value(
          value: stateManager,
          child: MaterialApp(
            home: Consumer<SynchronizedStateManager>(
              builder: (context, state, child) {
                return Text(state.getState<String>('key') ?? 'لا توجد قيمة');
              },
            ),
          ),
        ),
      );
      
      // التأكيد - الحالة الأولية
      expect(find.text('لا توجد قيمة'), findsOneWidget);
      
      // الفعل - تحديث الحالة
      stateManager.setState('key', 'قيمة محدثة');
      await tester.pump();
      
      // التأكيد - الحالة المحدثة
      expect(find.text('قيمة محدثة'), findsOneWidget);
    });
  });
}
\`\`\`

أنماط إدارة الحالة المتقدمة تمكنك من بناء تطبيقات معقدة وقابلة للصيانة تتوسع بشكل فعال مع قاعدة المستخدمين ومتطلبات الميزات الخاصة بك.
          `
        }
      ]
    },
    {
      id: 3,
      title: "التطبيقات العملية وحل المشاكل",
      description: "الحزم الأساسية، widgets جديدة، وحل المشاكل في العالم الحقيقي",
      chapters: [
        {
          id: 18,
          title: "حزم Flutter الأساسية",
          sections: [
            "إدارة الحالة: Provider، Riverpod، BLoC",
            "الشبكة و API: Dio، Retrofit، Chopper",
            "التخزين المحلي: Hive، Sqflite، Shared Preferences",
            "الأدوات وتكامل المنصة"
          ],
          readTime: "45 دقيقة",
          content: `
# الفصل الثامن عشر: حزم Flutter الأساسية

نظام Flutter البيئي غني بالحزم التي يمكن أن تسرع بشكل كبير من عملية التطوير الخاصة بك وتضيف وظائف قوية لتطبيقاتك. يغطي هذا الفصل الحزم الأكثر أهمية التي يجب على كل مطور Flutter معرفتها، منظمة حسب الفئة وحالة الاستخدام.

## 18.1 إدارة الحالة: Provider، Riverpod، BLoC

إدارة الحالة أمر بالغ الأهمية لبناء تطبيقات Flutter قابلة للتوسع. تقدم الحزم المختلفة نهج مختلفة لإدارة حالة التطبيق.

### Provider - بسيط وبديهي

Provider هو أحد حلول إدارة الحالة الأكثر شعبية، موصى به رسمياً من فريق Flutter.

\`\`\`dart
// مثال العداد مع Provider
class Counter extends ChangeNotifier {
  int _count = 0;
  
  int get count => _count;
  
  void increment() {
    _count++;
    notifyListeners();
  }
  
  void decrement() {
    _count--;
    notifyListeners();
  }
}

// الاستخدام في main.dart
void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => Counter(),
      child: MyApp(),
    ),
  );
}

// الاستخدام في widget
class CounterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<Counter>(
      builder: (context, counter, child) {
        return Column(
          children: [
            Text('العدد: \${counter.count}'),
            Row(
              children: [
                ElevatedButton(
                  onPressed: counter.increment,
                  child: Text('+'),
                ),
                ElevatedButton(
                  onPressed: counter.decrement,
                  child: Text('-'),
                ),
              ],
            ),
          ],
        );
      },
    );
  }
}
\`\`\`

### Riverpod - تطور Provider

Riverpod هو الجيل التالي من Provider، يقدم أداء أفضل وأمان ومطور تجربة.

\`\`\`dart
// العداد مع Riverpod
final counterProvider = StateNotifierProvider<CounterNotifier, int>((ref) {
  return CounterNotifier();
});

class CounterNotifier extends StateNotifier<int> {
  CounterNotifier() : super(0);
  
  void increment() => state++;
  void decrement() => state--;
}

// الاستخدام
class CounterWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(counterProvider);
    final counterNotifier = ref.read(counterProvider.notifier);
    
    return Column(
      children: [
        Text('العدد: \$count'),
        Row(
          children: [
            ElevatedButton(
              onPressed: counterNotifier.increment,
              child: Text('+'),
            ),
            ElevatedButton(
              onPressed: counterNotifier.decrement,
              child: Text('-'),
            ),
          ],
        ),
      ],
    );
  }
}
\`\`\`

### BLoC - مكون منطق الأعمال

نمط BLoC يفصل منطق الأعمال عن مكونات واجهة المستخدم باستخدام streams و events.

\`\`\`dart
// Events
abstract class CounterEvent {}
class CounterIncremented extends CounterEvent {}
class CounterDecremented extends CounterEvent {}

// States
class CounterState {
  final int count;
  CounterState(this.count);
}

// BLoC
class CounterBloc extends Bloc<CounterEvent, CounterState> {
  CounterBloc() : super(CounterState(0)) {
    on<CounterIncremented>((event, emit) {
      emit(CounterState(state.count + 1));
    });
    
    on<CounterDecremented>((event, emit) {
      emit(CounterState(state.count - 1));
    });
  }
}

// الاستخدام
class CounterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<CounterBloc, CounterState>(
      builder: (context, state) {
        return Column(
          children: [
            Text('العدد: \${state.count}'),
            Row(
              children: [
                ElevatedButton(
                  onPressed: () => context.read<CounterBloc>().add(CounterIncremented()),
                  child: Text('+'),
                ),
                ElevatedButton(
                  onPressed: () => context.read<CounterBloc>().add(CounterDecremented()),
                  child: Text('-'),
                ),
              ],
            ),
          ],
        );
      },
    );
  }
}
\`\`\`

## 18.2 الشبكة و API: Dio، Retrofit، Chopper

إجراء طلبات HTTP والتعامل مع اتصال API أمر أساسي لمعظم التطبيقات الحديثة.

### Dio - عميل HTTP قوي

Dio هو عميل HTTP قوي مع interceptors، وتحويل request/response، والمزيد.

\`\`\`dart
class ApiService {
  late Dio _dio;
  
  ApiService() {
    _dio = Dio(BaseOptions(
      baseUrl: 'https://api.example.com',
      connectTimeout: Duration(seconds: 5),
      receiveTimeout: Duration(seconds: 3),
    ));
    
    // إضافة interceptors
    _dio.interceptors.add(LogInterceptor(
      requestBody: true,
      responseBody: true,
    ));
    
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) {
        // إضافة token المصادقة
        options.headers['Authorization'] = 'Bearer \${getToken()}';
        handler.next(options);
      },
      onError: (error, handler) {
        // التعامل مع الأخطاء عالمياً
        if (error.response?.statusCode == 401) {
          // إعادة توجيه إلى تسجيل الدخول
        }
        handler.next(error);
      },
    ));
  }
  
  Future<List<User>> getUsers() async {
    try {
      final response = await _dio.get('/users');
      return (response.data as List)
          .map((json) => User.fromJson(json))
          .toList();
    } on DioException catch (e) {
      throw ApiException.fromDioError(e);
    }
  }
  
  Future<User> createUser(User user) async {
    try {
      final response = await _dio.post('/users', data: user.toJson());
      return User.fromJson(response.data);
    } on DioException catch (e) {
      throw ApiException.fromDioError(e);
    }
  }
}
\`\`\`

## 18.3 التخزين المحلي: Hive، Sqflite، Shared Preferences

تخزين البيانات المحلي أمر بالغ الأهمية للوظائف غير المتصلة والتخزين المؤقت.

### Hive - قاعدة بيانات NoSQL سريعة

Hive هي قاعدة بيانات key-value خفيفة وسريعة مكتوبة في Dart خالص.

\`\`\`dart
// Model مع تعليقات Hive
@HiveType(typeId: 0)
class User extends HiveObject {
  @HiveField(0)
  String id;
  
  @HiveField(1)
  String name;
  
  @HiveField(2)
  String email;
  
  User({required this.id, required this.name, required this.email});
}

// Repository
class UserRepository {
  static const String _boxName = 'users';
  
  Future<Box<User>> get _box async => await Hive.openBox<User>(_boxName);
  
  Future<void> addUser(User user) async {
    final box = await _box;
    await box.put(user.id, user);
  }
  
  Future<User?> getUser(String id) async {
    final box = await _box;
    return box.get(id);
  }
  
  Future<List<User>> getAllUsers() async {
    final box = await _box;
    return box.values.toList();
  }
  
  Future<void> deleteUser(String id) async {
    final box = await _box;
    await box.delete(id);
  }
}

// تهيئة Hive
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  await Hive.initFlutter();
  Hive.registerAdapter(UserAdapter());
  
  runApp(MyApp());
}
\`\`\`

### Sqflite - SQLite لـ Flutter

للبيانات العلائقية المعقدة، يوفر Sqflite تنفيذ SQLite كامل.

\`\`\`dart
class DatabaseHelper {
  static final DatabaseHelper _instance = DatabaseHelper._internal();
  factory DatabaseHelper() => _instance;
  DatabaseHelper._internal();
  
  static Database? _database;
  
  Future<Database> get database async {
    _database ??= await _initDatabase();
    return _database!;
  }
  
  Future<Database> _initDatabase() async {
    String path = join(await getDatabasesPath(), 'app_database.db');
    return await openDatabase(
      path,
      version: 1,
      onCreate: _onCreate,
    );
  }
  
  Future<void> _onCreate(Database db, int version) async {
    await db.execute('''
      CREATE TABLE users(
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        created_at INTEGER NOT NULL
      )
    ''');
  }
  
  Future<int> insertUser(User user) async {
    final db = await database;
    return await db.insert('users', user.toMap());
  }
  
  Future<List<User>> getUsers() async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query('users');
    return List.generate(maps.length, (i) => User.fromMap(maps[i]));
  }
  
  Future<int> updateUser(User user) async {
    final db = await database;
    return await db.update(
      'users',
      user.toMap(),
      where: 'id = ?',
      whereArgs: [user.id],
    );
  }
  
  Future<int> deleteUser(String id) async {
    final db = await database;
    return await db.delete(
      'users',
      where: 'id = ?',
      whereArgs: [id],
    );
  }
}
\`\`\`

هذه الحزم الأساسية تشكل أساس معظم تطبيقات Flutter. فهم متى وكيفية استخدام كل واحدة منها سيحسن بشكل كبير من كفاءة التطوير الخاصة بك وجودة التطبيق.
          `
        },
        {
          id: 20,
          title: "سيناريوهات حل المشاكل العملية",
          sections: [
            "التعامل مع مجموعات البيانات الكبيرة من APIs",
            "تحسين أداء التطبيق",
            "تصحيح المشاكل المعقدة",
            "البناء لبيئات متعددة"
          ],
          readTime: "50 دقيقة",
          content: `
# الفصل العشرون: سيناريوهات حل المشاكل العملية

تطوير تطبيقات Flutter في العالم الحقيقي غالباً ما ينطوي على معالجة تحديات معقدة تتجاوز عرض واجهة المستخدم الأساسي وإدارة الحالة. يتعمق هذا الفصل في سيناريوهات حل المشاكل العملية التي تنشأ بشكل متكرر في تطبيقات الإنتاج.

## 20.1 التعامل مع مجموعات البيانات الكبيرة من APIs (ملايين العناصر)

استرداد وعرض ملايين العناصر من API يقدم تحديات كبيرة في تطوير تطبيقات الهاتف المحمول. جلب مثل هذه مجموعة البيانات الضخمة مباشرة غير عملي بسبب زمن استجابة الشبكة وقيود الذاكرة ومشاكل الأداء.

### التصفح والتمرير اللانهائي

التقنية الأساسية للتعامل مع مجموعات البيانات الكبيرة هي التصفح مجتمعة مع التمرير اللانهائي.

\`\`\`dart
class ItemListProvider with ChangeNotifier {
  List<Item> _items = [];
  int _currentPage = 1;
  bool _isLoading = false;
  bool _hasMoreData = true;
  
  List<Item> get items => _items;
  bool get isLoading => _isLoading;
  bool get hasMoreData => _hasMoreData;
  
  Future<void> fetchItems() async {
    if (_isLoading || !_hasMoreData) return;
    
    _isLoading = true;
    notifyListeners();
    
    try {
      final newItems = await _apiService.getItems(
        page: _currentPage, 
        limit: 20
      );
      
      if (newItems.isEmpty) {
        _hasMoreData = false;
      } else {
        _items.addAll(newItems);
        _currentPage++;
      }
    } catch (e) {
      // التعامل مع الخطأ
      print("خطأ في جلب العناصر: \$e");
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
  
  void reset() {
    _items = [];
    _currentPage = 1;
    _isLoading = false;
    _hasMoreData = true;
    notifyListeners();
  }
}

// الاستخدام في Widget
class ItemListPage extends StatefulWidget {
  @override
  State<ItemListPage> createState() => _ItemListPageState();
}

class _ItemListPageState extends State<ItemListPage> {
  final ScrollController _scrollController = ScrollController();
  
  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_onScroll);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<ItemListProvider>(context, listen: false).fetchItems();
    });
  }
  
  void _onScroll() {
    final provider = Provider.of<ItemListProvider>(context, listen: false);
    if (_scrollController.position.pixels >= 
        _scrollController.position.maxScrollExtent * 0.9 &&
        !provider.isLoading &&
        provider.hasMoreData) {
      provider.fetchItems();
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("مجموعة البيانات الكبيرة")),
      body: Consumer<ItemListProvider>(
        builder: (context, provider, child) {
          if (provider.items.isEmpty && provider.isLoading) {
            return Center(child: CircularProgressIndicator());
          }
          
          return ListView.builder(
            controller: _scrollController,
            itemCount: provider.items.length + (provider.isLoading ? 1 : 0),
            itemBuilder: (context, index) {
              if (index == provider.items.length) {
                return Padding(
                  padding: EdgeInsets.all(8.0),
                  child: Center(child: CircularProgressIndicator()),
                );
              }
              
              final item = provider.items[index];
              return ListTile(title: Text(item.name));
            },
          );
        },
      ),
    );
  }
}
\`\`\`

### تحليل البيانات الفعال مع Isolates

للاستجابات JSON الكبيرة، استخدم isolates لمنع حجب واجهة المستخدم:

\`\`\`dart
import 'dart:convert';
import 'dart:isolate';
import 'package:flutter/foundation.dart';

// دالة للتشغيل في isolate
List<Item> parseItems(String responseBody) {
  final parsed = jsonDecode(responseBody) as List<dynamic>;
  return parsed.map<Item>((json) => Item.fromJson(json)).toList();
}

// في خدمة API الخاصة بك
Future<List<Item>> fetchAndParseLargeData() async {
  final response = await dio.get('/large_data');
  
  // استخدام compute لتحليل JSON في isolate منفصل
  return await compute(parseItems, response.data as String);
}
\`\`\`

## 20.2 تحسين أداء التطبيق (تقنيات متقدمة)

تحسين الأداء يتطلب فهم خط أنابيب العرض في Flutter وتحديد نقاط الاختناق.

### تقليل إعادة بناء Widget

\`\`\`dart
// سيء: يعيد بناء شجرة widget بالكامل
class BadExample extends StatefulWidget {
  @override
  _BadExampleState createState() => _BadExampleState();
}

class _BadExampleState extends State<BadExample> {
  int counter = 0;
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ExpensiveWidget(), // يعيد البناء بلا ضرورة
        Text('العداد: \$counter'),
        ElevatedButton(
          onPressed: () => setState(() => counter++),
          child: Text('زيادة'),
        ),
      ],
    );
  }
}

// جيد: عزل إعادة البناء مع const و keys
class GoodExample extends StatefulWidget {
  @override
  _GoodExampleState createState() => _GoodExampleState();
}

class _GoodExampleState extends State<GoodExample> {
  int counter = 0;
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const ExpensiveWidget(), // لن يعيد البناء
        CounterDisplay(counter: counter), // فقط هذا يعيد البناء
        ElevatedButton(
          onPressed: () => setState(() => counter++),
          child: Text('زيادة'),
        ),
      ],
    );
  }
}

class CounterDisplay extends StatelessWidget {
  final int counter;
  
  const CounterDisplay({Key? key, required this.counter}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Text('العداد: \$counter');
  }
}
\`\`\`

### تحسين القوائم مع itemExtent

\`\`\`dart
// ListView محسن مع ارتفاع عنصر ثابت
ListView.builder(
  itemExtent: 80.0, // الارتفاع الثابت يحسن أداء التمرير
  itemCount: items.length,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text(items[index].name),
      subtitle: Text(items[index].description),
    );
  },
)
\`\`\`

## 20.3 تصحيح المشاكل المعقدة

التصحيح المتقدم يتطلب نهج منهجية والأدوات المناسبة.

### استخدام Flutter DevTools

\`\`\`dart
// تمكين overlay الأداء في وضع التصحيح
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // إظهار overlay الأداء
      showPerformanceOverlay: kDebugMode,
      // تمكين banner التصحيح
      debugShowCheckedModeBanner: kDebugMode,
      home: HomePage(),
    );
  }
}

// أدوات التصحيح المخصصة
class DebugUtils {
  static void logWidgetBuild(String widgetName) {
    if (kDebugMode) {
      print('بناء \$widgetName في \${DateTime.now()}');
    }
  }
  
  static void measurePerformance(String operation, Function() function) {
    if (kDebugMode) {
      final stopwatch = Stopwatch()..start();
      function();
      stopwatch.stop();
      print('\$operation استغرق \${stopwatch.elapsedMilliseconds}ms');
    } else {
      function();
    }
  }
}
\`\`\`

### كشف تسريب الذاكرة

\`\`\`dart
class MemoryLeakDetector {
  static final Map<String, int> _instanceCounts = {};
  
  static void trackInstance(String className) {
    if (kDebugMode) {
      _instanceCounts[className] = (_instanceCounts[className] ?? 0) + 1;
      print('تم إنشاء \$className. المجموع: \${_instanceCounts[className]}');
    }
  }
  
  static void untrackInstance(String className) {
    if (kDebugMode) {
      _instanceCounts[className] = (_instanceCounts[className] ?? 1) - 1;
      print('تم التخلص من \$className. المتبقي: \${_instanceCounts[className]}');
    }
  }
  
  static void printInstanceCounts() {
    if (kDebugMode) {
      print('عدد المثيلات الحالية:');
      _instanceCounts.forEach((className, count) {
        print('  \$className: \$count');
      });
    }
  }
}

// الاستخدام في StatefulWidget
class TrackedWidget extends StatefulWidget {
  @override
  _TrackedWidgetState createState() => _TrackedWidgetState();
}

class _TrackedWidgetState extends State<TrackedWidget> {
  @override
  void initState() {
    super.initState();
    MemoryLeakDetector.trackInstance('TrackedWidget');
  }
  
  @override
  void dispose() {
    MemoryLeakDetector.untrackInstance('TrackedWidget');
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
\`\`\`

## 20.4 البناء لبيئات متعددة

إدارة تكوينات مختلفة لبيئات التطوير والاختبار والإنتاج.

### تكوين البيئة

\`\`\`dart
enum BuildFlavor {
  development,
  staging,
  production,
}

class AppConfig {
  final BuildFlavor flavor;
  final String baseUrl;
  final String apiKey;
  final bool enableLogging;
  
  AppConfig._({
    required this.flavor,
    required this.baseUrl,
    required this.apiKey,
    required this.enableLogging,
  });
  
  static AppConfig? _instance;
  
  static AppConfig get instance {
    _instance ??= _loadConfig();
    return _instance!;
  }
  
  static AppConfig _loadConfig() {
    const flavorString = String.fromEnvironment(
      "FLAVOR", 
      defaultValue: "development"
    );
    
    switch (flavorString) {
      case "production":
        return AppConfig._(
          flavor: BuildFlavor.production,
          baseUrl: "https://api.myapp.com",
          apiKey: "prod_api_key",
          enableLogging: false,
        );
      case "staging":
        return AppConfig._(
          flavor: BuildFlavor.staging,
          baseUrl: "https://staging-api.myapp.com",
          apiKey: "staging_api_key",
          enableLogging: true,
        );
      case "development":
      default:
        return AppConfig._(
          flavor: BuildFlavor.development,
          baseUrl: "https://dev-api.myapp.com",
          apiKey: "dev_api_key",
          enableLogging: true,
        );
    }
  }
}

// الاستخدام
class ApiService {
  late Dio _dio;
  
  ApiService() {
    final config = AppConfig.instance;
    
    _dio = Dio(BaseOptions(
      baseUrl: config.baseUrl,
      headers: {
        'Authorization': 'Bearer \${config.apiKey}',
      },
    ));
    
    if (config.enableLogging) {
      _dio.interceptors.add(LogInterceptor(
        requestBody: true,
        responseBody: true,
      ));
    }
  }
}
\`\`\`

### نصوص البناء لبيئات مختلفة

\`\`\`bash
# نصوص البناء لبيئات مختلفة

# التطوير
flutter run --dart-define=FLAVOR=development

# الاختبار
flutter build apk --release --dart-define=FLAVOR=staging

# الإنتاج
flutter build apk --release --dart-define=FLAVOR=production
\`\`\`

هذه التقنيات العملية لحل المشاكل ستساعدك في التعامل مع التحديات الحقيقية في تطوير Flutter، من تحسين الأداء إلى إدارة البيئة وتصحيح المشاكل المعقدة.
          `
        }
      ]
    }
  ]
};

// Helper functions for navigation and content management
export const getPartByIdArabic = (partId) => {
  return bookDataArabic.parts.find(part => part.id === parseInt(partId));
};

export const getChapterByIdArabic = (chapterId) => {
  for (const part of bookDataArabic.parts) {
    const chapter = part.chapters.find(chapter => chapter.id === parseInt(chapterId));
    if (chapter) {
      return { ...chapter, partId: part.id };
    }
  }
  return null;
};

export const getAllChaptersArabic = () => {
  return bookDataArabic.parts.flatMap(part => 
    part.chapters.map(chapter => ({ ...chapter, partId: part.id }))
  );
};

export const getNextChapterArabic = (currentChapterId) => {
  const allChapters = getAllChaptersArabic();
  const currentIndex = allChapters.findIndex(chapter => chapter.id === parseInt(currentChapterId));
  return currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;
};

export const getPreviousChapterArabic = (currentChapterId) => {
  const allChapters = getAllChaptersArabic();
  const currentIndex = allChapters.findIndex(chapter => chapter.id === parseInt(currentChapterId));
  return currentIndex > 0 ? allChapters[currentIndex - 1] : null;
};

