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

