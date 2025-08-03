// Chapter 12: MVVM Architecture in Flutter
export function getChapter12Content() {
  return {
    id: 12,
    partId: 2,
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
  };
} 