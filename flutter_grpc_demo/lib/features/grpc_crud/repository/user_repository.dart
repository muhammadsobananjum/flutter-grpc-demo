import 'package:flutter/material.dart';
import 'package:injectable/injectable.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../../../core/di/injection.dart';
import '../../../core/network/grpc_user_client.dart';
import '../../../core/repositories/i_user_repository.dart';
import '../../../generated/user.pb.dart';

part 'user_repository.g.dart';

@riverpod
UserRepository userRepository(UserRepositoryRef ref) {
  return UserRepository(getIt<UserService>());
}

@injectable
class UserRepository extends IUserRepository {
  final UserService service;

  UserRepository(this.service);

  @override
  Future<List<User>> fetchAllUsers() async {
    final result = await service.userClient.getAllUsers(Empty());
    return result.users;
  }

  @override
  Future<void> registerNewUser(String username, String password, bool isActive) async {
    final params = RegisterUserRequest(username: username, password: password, isActive: isActive);
    final result = await service.userClient.registerUser(params);
    debugPrint('<< ${result.message} >>');
  }

  @override
  Future<void> deleteUser(String id) async {
    final params = DeleteUserRequest(id: id);
    final result = await service.userClient.deleteUser(params);
    debugPrint('<< ${result.message} >>');
  }

  @override
  Future<void> updateUser(String id, String username, String password, bool isActive) async{
    final params = User(id: id,username: username,password: password,isActive: isActive);
    final result = await service.userClient.updateUser(params);
    debugPrint('<< ${result.message} >>');
  }
}
