// الفصل الحادي عشر: التصميم المتجاوب وواجهات المستخدم التكيفية
export function getChapter11ContentArabic() {
  return {
    id: 11,
    partId: 2,
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
  };
} 