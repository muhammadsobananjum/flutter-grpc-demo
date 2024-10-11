import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../generated/user.pb.dart';
import '../viewmodel/grpc_crud_viewmodel.dart';

class UserCrudScreen extends ConsumerWidget {
  const UserCrudScreen({super.key});



  @override
  Widget build(BuildContext context, WidgetRef ref) {

    final userState = ref.watch(userViewModelProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Users')),
      body: userState.when(
        data: (users) {
          return ListView.builder(
            itemCount: users.length ?? 0,
            itemBuilder: (context, index) {
              return ListTile(
                title: Text(users[index].username ?? ''),
                subtitle: Text((users[index].isActive ?? false) ? 'Active' : 'Inactive'),
                // Optional: Add buttons for editing and deleting users
                trailing: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    IconButton(
                      icon: const Icon(Icons.edit),
                      onPressed: () {
                        // Call update user logic here
                        _showEditUserDialog(context, ref, users[index] ?? User());
                      },
                    ),
                    IconButton(
                      icon: const Icon(Icons.delete),
                      onPressed: () {
                        // Call delete user logic here
                        ref.read(userViewModelProvider.notifier).deleteUser(users[index].id ?? '');
                      },
                    ),
                  ],
                ),
              );
            },
          );
        },
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, _) => Center(child: Text('Error: $error')),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Call the add user logic here
          _showAddUserDialog(context, ref);
        },
        child: const Icon(Icons.add),
      ),
    );
  }

  void _showAddUserDialog(BuildContext context, WidgetRef ref) {
    final usernameController = TextEditingController();
    final passwordController = TextEditingController();
    bool isActive = true;

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Add User'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: usernameController,
                decoration: const InputDecoration(labelText: 'Username'),
              ),
              TextField(
                controller: passwordController,
                decoration: const InputDecoration(labelText: 'Password'),
                obscureText: true,
              ),
              CheckboxListTile(
                title: const Text('Active'),
                value: isActive,
                onChanged: (value) {
                  isActive = value ?? false;
                },
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                ref.read(userViewModelProvider.notifier).registerNewUser(
                  usernameController.text,
                  passwordController.text,
                  isActive,
                );
                Navigator.of(context).pop(); // Close the dialog
              },
              child: const Text('Add'),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Close the dialog
              },
              child: const Text('Cancel'),
            ),
          ],
        );
      },
    );
  }

  void _showEditUserDialog(BuildContext context, WidgetRef ref, User user) {
    final usernameController = TextEditingController(text: user.username);
    final passwordController = TextEditingController(text: user.password); // Assuming you have access to the password
    bool isActive = user.isActive;

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Edit User'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: usernameController,
                decoration: const InputDecoration(labelText: 'Username'),
              ),
              TextField(
                controller: passwordController,
                decoration: const InputDecoration(labelText: 'Password'),
                obscureText: true,
              ),
              CheckboxListTile(
                title: const Text('Active'),
                value: isActive,
                onChanged: (value) {
                  isActive = value ?? false;
                },
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                ref.read(userViewModelProvider.notifier).updateUser(
                  user.id,
                  usernameController.text,
                  passwordController.text,
                  isActive,
                );
                Navigator.of(context).pop(); // Close the dialog
              },
              child: const Text('Update'),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Close the dialog
              },
              child: const Text('Cancel'),
            ),
          ],
        );
      },
    );
  }
}
