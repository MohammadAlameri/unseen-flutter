// Book content data structure
export const bookData = {
  title: "The Unseen Flutter: A Deep Dive into Internals and Advanced Concepts",
  subtitle: "A comprehensive guide for experienced Flutter developers",
  
  parts: [
    {
      id: 1,
      title: "The Core Mechanics of Flutter",
      description: "Dive deep into Flutter's three trees, build process, and internal architecture",
      chapters: [
        {
          id: 1,
          title: "Beyond the Widget: Understanding Flutter's Three Trees",
          sections: [
            "The Widget Tree: Your UI Blueprint",
            "The Element Tree: The Mutable Bridge", 
            "The Render Tree: Painting Pixels on Screen",
            "The Dance of the Trees: How UI Updates Happen"
          ],
          readTime: "25 min",
          content: `
# Chapter 1: Beyond the Widget: Understanding Flutter's Three Trees

In Flutter, everything is a widget. This often-repeated mantra is fundamental to understanding Flutter's declarative UI paradigm. However, the \`Widget\` objects you write in your Dart code are merely blueprints. Behind the scenes, Flutter employs a sophisticated system involving three distinct but interconnected trees to efficiently render and update your application's user interface: the Widget Tree, the Element Tree, and the Render Tree.

## 1.1 The Widget Tree: Your UI Blueprint

The Widget Tree is the most familiar of the three trees to Flutter developers, as it directly corresponds to the declarative UI code written in Dart. Every visual and non-visual component in a Flutter application is, at its core, a \`Widget\`. From \`Text\` and \`Image\` to \`Column\` and \`GestureDetector\`, each \`Widget\` serves as a declarative description of a part of the user interface.

\`\`\`dart
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Hello Flutter'),
        Container(
          child: Icon(Icons.star),
        ),
      ],
    );
  }
}
\`\`\`

It is crucial to understand that \`Widget\` objects in Flutter are **immutable**. This immutability is a cornerstone of Flutter's performance and predictability. Once a \`Widget\` object is created, its configuration (its properties) cannot be changed.

## 1.2 The Element Tree: The Mutable Bridge

While \`Widget\`s are the declarative blueprints of your UI, the \`Element\` tree is the mutable, concrete representation of your application's UI hierarchy. For every \`Widget\` in the Widget Tree, Flutter creates a corresponding \`Element\` in the Element Tree.

Unlike \`Widget\`s, \`Element\`s are mutable and more persistent. They are the intermediaries between the immutable \`Widget\` configurations and the low-level \`RenderObject\`s that handle the actual rendering.

## 1.3 The Render Tree: Painting Pixels on Screen

The \`Render Tree\`, also known as the \`RenderObject\` tree, is the lowest-level tree in Flutter's UI rendering pipeline. While the Widget Tree describes the desired UI configuration and the Element Tree manages the UI hierarchy, the Render Tree is responsible for the actual layout, painting, and hit testing of the UI on the screen.

\`RenderObject\`s are highly optimized for performance. They are designed to be efficient in terms of memory usage and rendering speed. Unlike \`Widget\`s, which are immutable and rebuilt frequently, \`RenderObject\`s are mutable and persistent.

## 1.4 The Dance of the Trees: How UI Updates Happen

The true power and efficiency of Flutter's rendering engine lie in the intricate dance between the Widget, Element, and Render trees during UI updates. This coordinated effort, often referred to as the **reconciliation process**, is what allows Flutter to achieve its impressive performance and smooth animations.

When a \`StatefulWidget\`'s \`setState()\` method is called, or when a parent \`StatelessWidget\` rebuilds, a new \`Widget\` tree is generated. Flutter then embarks on a process of comparing this new \`Widget\` tree with the existing \`Element\` tree.
          `
        },
        {
          id: 2,
          title: "The Flutter Build Process: From Dart to Native",
          sections: [
            "Compilation Pipeline Overview",
            "Dart-to-Native Compilation",
            "Android Build Process and Gradle",
            "iOS Build Process and Xcode Integration"
          ],
          readTime: "30 min",
          content: `
# Chapter 2: The Flutter Build Process: From Dart to Native

Understanding how Flutter transforms your Dart code into native applications is crucial for optimizing build times, troubleshooting deployment issues, and making informed architectural decisions. This chapter will take you through the entire compilation pipeline, from your source code to the final native binaries that run on devices.

## 2.1 Compilation Pipeline Overview

Flutter's compilation process varies significantly between development and production builds, and between different target platforms. The framework employs different compilation strategies to optimize for development speed during debugging and runtime performance in production.

### Development vs Production Builds

**Development Builds (Debug Mode):**
- Use Just-In-Time (JIT) compilation
- Enable hot reload and hot restart
- Include debugging information and assertions
- Larger binary size but faster compilation

**Production Builds (Release Mode):**
- Use Ahead-Of-Time (AOT) compilation
- Optimized for performance and size
- No debugging overhead
- Smaller, faster binaries

## 2.2 Dart-to-Native Compilation

Flutter's compilation process begins with your Dart source code and transforms it through several stages before producing native machine code.

\`\`\`dart
// Your Dart code
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text('Hello, Flutter!'),
        ),
      ),
    );
  }
}
\`\`\`

### The Compilation Stages

1. **Dart Source Analysis**: The Dart analyzer checks your code for syntax errors, type errors, and other issues
2. **Kernel Generation**: Dart code is compiled to Dart Kernel format (.dill files)
3. **Platform-Specific Compilation**: Kernel is compiled to native code for the target platform
4. **Linking and Packaging**: Native code is linked with Flutter engine and packaged

## 2.3 Android Build Process and Gradle

The Android build process is orchestrated by Gradle, Android's official build system. Understanding this process is essential for customizing builds, managing dependencies, and troubleshooting build issues.

### Gradle Build Configuration

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

### The Android Build Pipeline

1. **Resource Processing**: Android resources (layouts, drawables, strings) are processed and compiled
2. **Dart Compilation**: Flutter Dart code is compiled to native ARM/x64 code
3. **Native Library Integration**: Flutter engine and your compiled Dart code are packaged as native libraries
4. **APK/AAB Generation**: Everything is packaged into an APK or Android App Bundle

## 2.4 iOS Build Process and Xcode Integration

The iOS build process integrates with Xcode's build system and follows Apple's compilation pipeline while incorporating Flutter-specific steps.

### iOS Build Configuration

\`\`\`xml
<!-- ios/Runner/Info.plist -->
<key>CFBundleIdentifier</key>
<string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
<key>CFBundleName</key>
<string>MyApp</string>
<key>CFBundleVersion</key>
<string>$(FLUTTER_BUILD_NUMBER)</string>
\`\`\`

### The iOS Build Pipeline

1. **Xcode Project Generation**: Flutter generates or updates the Xcode project
2. **Dart AOT Compilation**: Dart code is compiled to native ARM64 code
3. **Framework Integration**: Flutter.framework is embedded in the iOS app
4. **Code Signing**: The app is signed with your development or distribution certificate
5. **IPA Generation**: The final iOS app package is created

Understanding these build processes helps you optimize compilation times, troubleshoot platform-specific issues, and make informed decisions about app architecture and deployment strategies.
          `
        }
      ]
    },
    {
      id: 2,
      title: "Advanced Patterns and Architecture",
      description: "Master responsive design, MVVM, state management, and clean architecture",
      chapters: [
        {
          id: 11,
          title: "Responsive Design and Adaptive UIs",
          sections: [
            "Understanding Screen Sizes and Breakpoints",
            "Flexible Layouts with Flex and Expanded",
            "MediaQuery and LayoutBuilder",
            "Platform-Specific Adaptations"
          ],
          readTime: "35 min",
          content: `
# Chapter 11: Responsive Design and Adaptive UIs

Creating applications that work seamlessly across different screen sizes, orientations, and platforms is essential in today's multi-device world. Flutter provides powerful tools and patterns for building responsive and adaptive user interfaces that provide optimal user experiences regardless of the device.

## 11.1 Understanding Screen Sizes and Breakpoints

Responsive design in Flutter starts with understanding the various screen sizes and establishing breakpoints that define how your UI should adapt.

### Common Device Categories

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

## 11.2 Flexible Layouts with Flex and Expanded

Flutter's Flex widgets (Row and Column) combined with Expanded and Flexible widgets provide the foundation for responsive layouts.

\`\`\`dart
class ResponsiveLayout extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          // Fixed header
          Container(
            height: 80,
            color: Colors.blue,
            child: Center(child: Text('Header')),
          ),
          // Flexible content area
          Expanded(
            child: Row(
              children: [
                // Sidebar (1/4 of width on desktop, hidden on mobile)
                if (ScreenSize.isDesktop(context))
                  Expanded(
                    flex: 1,
                    child: Container(
                      color: Colors.grey[200],
                      child: Center(child: Text('Sidebar')),
                    ),
                  ),
                // Main content (3/4 on desktop, full width on mobile)
                Expanded(
                  flex: ScreenSize.isDesktop(context) ? 3 : 1,
                  child: Container(
                    color: Colors.white,
                    child: Center(child: Text('Main Content')),
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

## 11.3 MediaQuery and LayoutBuilder

MediaQuery provides information about the device and screen, while LayoutBuilder gives you the constraints of the parent widget.

\`\`\`dart
class AdaptiveCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth > 600) {
          // Wide layout - horizontal
          return Card(
            child: Row(
              children: [
                Expanded(flex: 1, child: _buildImage()),
                Expanded(flex: 2, child: _buildContent()),
              ],
            ),
          );
        } else {
          // Narrow layout - vertical
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
        Text('Title', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
        SizedBox(height: 8),
        Text('Description text that adapts to the available space...'),
      ],
    ),
  );
}
\`\`\`

## 11.4 Platform-Specific Adaptations

Sometimes you need to adapt not just to screen size, but to platform conventions and capabilities.

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

Responsive design in Flutter is about creating flexible layouts that adapt gracefully to different screen sizes and orientations, while adaptive design focuses on platform-specific behaviors and conventions. By combining these approaches, you can create applications that feel native and polished on every device.
          `
        },
        {
          id: 12,
          title: "MVVM Architecture in Flutter",
          sections: [
            "Understanding MVVM Pattern",
            "Implementing ViewModels",
            "Data Binding and State Management",
            "Testing MVVM Components"
          ],
          readTime: "40 min",
          content: `
# Chapter 12: MVVM Architecture in Flutter

Model-View-ViewModel (MVVM) is a powerful architectural pattern that promotes separation of concerns, testability, and maintainability in Flutter applications. This chapter explores how to implement MVVM effectively in Flutter using modern state management solutions.

## 12.1 Understanding MVVM Pattern

MVVM separates your application into three distinct layers:

- **Model**: Data and business logic
- **View**: UI components (Widgets)
- **ViewModel**: Mediates between Model and View, contains presentation logic

### Benefits of MVVM in Flutter

\`\`\`dart
// Traditional approach - tightly coupled
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
    _loadUser(); // Business logic mixed with UI
  }
  
  Future<void> _loadUser() async {
    setState(() => isLoading = true);
    // Direct API call in UI layer
    user = await ApiService.getUser();
    setState(() => isLoading = false);
  }
  
  @override
  Widget build(BuildContext context) {
    // UI code mixed with state management
    return Scaffold(/* ... */);
  }
}
\`\`\`

## 12.2 Implementing ViewModels

ViewModels in Flutter can be implemented using various state management solutions. Here's an example using Provider:

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
  
  // Getters for View to access state
  User? get user => _user;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  bool get hasError => _errorMessage != null;
  
  // Commands for View to trigger actions
  Future<void> loadUser(String userId) async {
    _setLoading(true);
    _clearError();
    
    try {
      _user = await _userRepository.getUser(userId);
    } catch (e) {
      _errorMessage = 'Failed to load user: \${e.toString()}';
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
      _errorMessage = 'Failed to update user: \${e.toString()}';
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

## 12.3 Data Binding and State Management

The View layer binds to the ViewModel and reacts to state changes:

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
        appBar: AppBar(title: Text('User Profile')),
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
                      child: Text('Retry'),
                    ),
                  ],
                ),
              );
            }
            
            if (viewModel.user == null) {
              return Center(child: Text('No user found'));
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
            child: Text('Edit Profile'),
          ),
        ],
      ),
    );
  }
  
  void _showEditDialog(BuildContext context, UserProfileViewModel viewModel, User user) {
    // Edit dialog implementation
  }
}
\`\`\`

## 12.4 Testing MVVM Components

MVVM architecture makes testing much easier by separating concerns:

\`\`\`dart
// ViewModel Test
class MockUserRepository extends Mock implements UserRepository {}

void main() {
  group('UserProfileViewModel', () {
    late MockUserRepository mockRepository;
    late UserProfileViewModel viewModel;
    
    setUp(() {
      mockRepository = MockUserRepository();
      viewModel = UserProfileViewModel(mockRepository);
    });
    
    test('should load user successfully', () async {
      // Arrange
      final user = User(
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
      );
      when(mockRepository.getUser('1')).thenAnswer((_) async => user);
      
      // Act
      await viewModel.loadUser('1');
      
      // Assert
      expect(viewModel.user, equals(user));
      expect(viewModel.isLoading, false);
      expect(viewModel.hasError, false);
    });
    
    test('should handle load user error', () async {
      // Arrange
      when(mockRepository.getUser('1')).thenThrow(Exception('Network error'));
      
      // Act
      await viewModel.loadUser('1');
      
      // Assert
      expect(viewModel.user, isNull);
      expect(viewModel.isLoading, false);
      expect(viewModel.hasError, true);
      expect(viewModel.errorMessage, contains('Network error'));
    });
  });
}
\`\`\`

MVVM architecture in Flutter promotes clean, testable, and maintainable code by clearly separating presentation logic from UI components and business logic. This separation makes your code easier to understand, test, and modify as your application grows.
          `
        }
      ]
    },
    {
      id: 3,
      title: "Practical Applications and Problem Solving",
      description: "Essential packages, new widgets, and real-world problem solving",
      chapters: [
        {
          id: 18,
          title: "Essential Flutter Packages",
          sections: [
            "State Management: Provider, Riverpod, BLoC",
            "Network and API: Dio, Retrofit, Chopper",
            "Local Storage: Hive, Sqflite, Shared Preferences",
            "Utility and Platform Integration"
          ],
          readTime: "45 min",
          content: `
# Chapter 18: Essential Flutter Packages

The Flutter ecosystem is rich with packages that can significantly accelerate your development process and add powerful functionality to your applications. This chapter covers the most essential packages every Flutter developer should know, organized by category and use case.

## 18.1 State Management: Provider, Riverpod, BLoC

State management is crucial for building scalable Flutter applications. Different packages offer different approaches to managing application state.

### Provider - Simple and Intuitive

Provider is one of the most popular state management solutions, officially recommended by the Flutter team.

\`\`\`dart
// Counter example with Provider
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

// Usage in main.dart
void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => Counter(),
      child: MyApp(),
    ),
  );
}

// Usage in widget
class CounterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<Counter>(
      builder: (context, counter, child) {
        return Column(
          children: [
            Text('Count: \${counter.count}'),
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

### Riverpod - Provider's Evolution

Riverpod is the next generation of Provider, offering better performance, safety, and developer experience.

\`\`\`dart
// Counter with Riverpod
final counterProvider = StateNotifierProvider<CounterNotifier, int>((ref) {
  return CounterNotifier();
});

class CounterNotifier extends StateNotifier<int> {
  CounterNotifier() : super(0);
  
  void increment() => state++;
  void decrement() => state--;
}

// Usage
class CounterWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(counterProvider);
    final counterNotifier = ref.read(counterProvider.notifier);
    
    return Column(
      children: [
        Text('Count: \$count'),
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

### BLoC - Business Logic Component

BLoC pattern separates business logic from UI components using streams and events.

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

// Usage
class CounterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<CounterBloc, CounterState>(
      builder: (context, state) {
        return Column(
          children: [
            Text('Count: \${state.count}'),
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

## 18.2 Network and API: Dio, Retrofit, Chopper

Making HTTP requests and handling API communication is essential for most modern applications.

### Dio - Powerful HTTP Client

Dio is a powerful HTTP client with interceptors, request/response transformation, and more.

\`\`\`dart
class ApiService {
  late Dio _dio;
  
  ApiService() {
    _dio = Dio(BaseOptions(
      baseUrl: 'https://api.example.com',
      connectTimeout: Duration(seconds: 5),
      receiveTimeout: Duration(seconds: 3),
    ));
    
    // Add interceptors
    _dio.interceptors.add(LogInterceptor(
      requestBody: true,
      responseBody: true,
    ));
    
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) {
        // Add auth token
        options.headers['Authorization'] = 'Bearer \${getToken()}';
        handler.next(options);
      },
      onError: (error, handler) {
        // Handle errors globally
        if (error.response?.statusCode == 401) {
          // Redirect to login
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

## 18.3 Local Storage: Hive, Sqflite, Shared Preferences

Local data storage is crucial for offline functionality and caching.

### Hive - Fast NoSQL Database

Hive is a lightweight and fast key-value database written in pure Dart.

\`\`\`dart
// Model with Hive annotations
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

// Initialize Hive
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  await Hive.initFlutter();
  Hive.registerAdapter(UserAdapter());
  
  runApp(MyApp());
}
\`\`\`

### Sqflite - SQLite for Flutter

For complex relational data, Sqflite provides a full SQLite implementation.

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

These essential packages form the foundation of most Flutter applications. Understanding when and how to use each one will significantly improve your development efficiency and application quality.
          `
        },
        {
          id: 20,
          title: "Practical Problem-Solving Scenarios",
          sections: [
            "Handling Large Datasets from APIs",
            "Optimizing App Performance",
            "Debugging Complex Issues",
            "Building for Multiple Environments"
          ],
          readTime: "50 min",
          content: `
# Chapter 20: Practical Problem-Solving Scenarios

Developing real-world Flutter applications often involves tackling complex challenges that go beyond basic UI rendering and state management. This chapter delves into practical problem-solving scenarios that frequently arise in production-grade applications.

## 20.1 Handling Large Datasets from APIs (Millions of Items)

Retrieving and displaying millions of items from an API presents significant challenges in mobile application development. Directly fetching such a massive dataset is impractical due to network latency, memory constraints, and performance issues.

### Pagination and Infinite Scrolling

The most fundamental technique for handling large datasets is pagination combined with infinite scrolling.

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
      // Handle error
      print("Error fetching items: \$e");
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

// Usage in Widget
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
      appBar: AppBar(title: Text("Large Dataset")),
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

### Efficient Data Parsing with Isolates

For large JSON responses, use isolates to prevent UI blocking:

\`\`\`dart
import 'dart:convert';
import 'dart:isolate';
import 'package:flutter/foundation.dart';

// Function to run in isolate
List<Item> parseItems(String responseBody) {
  final parsed = jsonDecode(responseBody) as List<dynamic>;
  return parsed.map<Item>((json) => Item.fromJson(json)).toList();
}

// In your API service
Future<List<Item>> fetchAndParseLargeData() async {
  final response = await dio.get('/large_data');
  
  // Use compute to parse JSON in separate isolate
  return await compute(parseItems, response.data as String);
}
\`\`\`

## 20.2 Optimizing App Performance (Advanced Techniques)

Performance optimization requires understanding Flutter's rendering pipeline and identifying bottlenecks.

### Reducing Widget Rebuilds

\`\`\`dart
// Bad: Rebuilds entire widget tree
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
        ExpensiveWidget(), // Rebuilds unnecessarily
        Text('Counter: \$counter'),
        ElevatedButton(
          onPressed: () => setState(() => counter++),
          child: Text('Increment'),
        ),
      ],
    );
  }
}

// Good: Isolate rebuilds with const and keys
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
        const ExpensiveWidget(), // Won't rebuild
        CounterDisplay(counter: counter), // Only this rebuilds
        ElevatedButton(
          onPressed: () => setState(() => counter++),
          child: Text('Increment'),
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
    return Text('Counter: \$counter');
  }
}
\`\`\`

### Optimizing Lists with itemExtent

\`\`\`dart
// Optimized ListView with fixed item height
ListView.builder(
  itemExtent: 80.0, // Fixed height improves scroll performance
  itemCount: items.length,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text(items[index].name),
      subtitle: Text(items[index].description),
    );
  },
)
\`\`\`

## 20.3 Debugging Complex Issues

Advanced debugging requires systematic approaches and proper tooling.

### Using Flutter DevTools

\`\`\`dart
// Enable performance overlay in debug mode
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // Show performance overlay
      showPerformanceOverlay: kDebugMode,
      // Enable debug banner
      debugShowCheckedModeBanner: kDebugMode,
      home: HomePage(),
    );
  }
}

// Custom debug utilities
class DebugUtils {
  static void logWidgetBuild(String widgetName) {
    if (kDebugMode) {
      print('Building \$widgetName at \${DateTime.now()}');
    }
  }
  
  static void measurePerformance(String operation, Function() function) {
    if (kDebugMode) {
      final stopwatch = Stopwatch()..start();
      function();
      stopwatch.stop();
      print('\$operation took \${stopwatch.elapsedMilliseconds}ms');
    } else {
      function();
    }
  }
}
\`\`\`

### Memory Leak Detection

\`\`\`dart
class MemoryLeakDetector {
  static final Map<String, int> _instanceCounts = {};
  
  static void trackInstance(String className) {
    if (kDebugMode) {
      _instanceCounts[className] = (_instanceCounts[className] ?? 0) + 1;
      print('Created \$className. Total: \${_instanceCounts[className]}');
    }
  }
  
  static void untrackInstance(String className) {
    if (kDebugMode) {
      _instanceCounts[className] = (_instanceCounts[className] ?? 1) - 1;
      print('Disposed \$className. Remaining: \${_instanceCounts[className]}');
    }
  }
  
  static void printInstanceCounts() {
    if (kDebugMode) {
      print('Current instance counts:');
      _instanceCounts.forEach((className, count) {
        print('  \$className: \$count');
      });
    }
  }
}

// Usage in StatefulWidget
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

## 20.4 Building for Multiple Environments

Managing different configurations for development, staging, and production environments.

### Environment Configuration

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

// Usage
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

### Build Scripts for Different Environments

\`\`\`bash
# Build scripts for different environments

# Development
flutter run --dart-define=FLAVOR=development

# Staging
flutter build apk --release --dart-define=FLAVOR=staging

# Production
flutter build apk --release --dart-define=FLAVOR=production
\`\`\`

These practical problem-solving techniques will help you handle real-world challenges in Flutter development, from performance optimization to environment management and debugging complex issues.
          `
        }
      ]
    }
  ]
};

// Helper functions for navigation and content management
export const getPartById = (partId) => {
  return bookData.parts.find(part => part.id === parseInt(partId));
};

export const getChapterById = (chapterId) => {
  for (const part of bookData.parts) {
    const chapter = part.chapters.find(chapter => chapter.id === parseInt(chapterId));
    if (chapter) {
      return { ...chapter, partId: part.id };
    }
  }
  return null;
};

export const getAllChapters = () => {
  return bookData.parts.flatMap(part => 
    part.chapters.map(chapter => ({ ...chapter, partId: part.id }))
  );
};

export const getNextChapter = (currentChapterId) => {
  const allChapters = getAllChapters();
  const currentIndex = allChapters.findIndex(chapter => chapter.id === parseInt(currentChapterId));
  return currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;
};

export const getPreviousChapter = (currentChapterId) => {
  const allChapters = getAllChapters();
  const currentIndex = allChapters.findIndex(chapter => chapter.id === parseInt(currentChapterId));
  return currentIndex > 0 ? allChapters[currentIndex - 1] : null;
};

