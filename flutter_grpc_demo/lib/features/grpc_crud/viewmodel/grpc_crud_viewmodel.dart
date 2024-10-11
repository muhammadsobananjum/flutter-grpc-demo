import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../../../generated/user.pb.dart';
import '../repository/user_repository.dart';

part 'grpc_crud_viewmodel.g.dart';


@riverpod
class UserViewModel extends _$UserViewModel {
  late final UserRepository _userRepository;

  late List<User> users = [];

  @override
  FutureOr<List<User>> build() async {
    _userRepository = ref.read(userRepositoryProvider);
    users = await _userRepository.fetchAllUsers();
    return users;
  }

  Future<List<User>> fetchAllUsers() async {
    state = const AsyncLoading();
    try {
      final users = await _userRepository.fetchAllUsers();
      state = AsyncData(users);
      return users;
    } catch (e, st) {
      state = AsyncError(e, st);
      rethrow;
    }
  }

  Future<void> registerNewUser(
      String username, String password, bool isActive) async {
    state = const AsyncLoading();
    try {
      await _userRepository.registerNewUser(username, password, isActive);
      users.add(User(username: username, password: password, isActive: isActive));
      state =  AsyncData(users);
    } catch (e, st) {
      state = AsyncError(e, st);
      rethrow;
    }
  }

  Future<void> deleteUser(String id) async {
    state = const AsyncLoading();
    try {
      await _userRepository.deleteUser(id);
      users.removeWhere((user)=> user.id == id);
      state =  AsyncData(users);
    } catch (e, st) {
      state = AsyncError(e, st);
      rethrow;
    }
  }

  Future<void> updateUser(
      String id, String username, String password, bool isActive) async {
    state = const AsyncLoading();
    try {
      await _userRepository.updateUser(id, username, password, isActive);
      users = users.map((user) {
        if (user.id == id) {
          return User(username: username, password: password, isActive: isActive);
        }
        return user;
      }).toList();
      state = AsyncData(users);
    } catch (e, st) {
      state = AsyncError(e, st);
      rethrow;
    }
  }
}
