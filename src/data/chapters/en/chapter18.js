// Chapter 18: Essential Flutter Packages
export function getChapter18Content() {
  return {
    id: 18,
    partId: 3,
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
      onRequest: (options, handler) => {
        // Add auth token
        options.headers['Authorization'] = 'Bearer \${getToken()}';
        handler.next(options);
      },
      onError: (error, handler) => {
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
  };
} 