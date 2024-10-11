import '../../generated/user.pb.dart';

abstract class IUserRepository {
  Future<List<User>> fetchAllUsers();
  Future<void> registerNewUser(String username, String password, bool isActive);
  Future<void> updateUser(String id,String username, String password, bool isActive);
  Future<void> deleteUser(String id);

}