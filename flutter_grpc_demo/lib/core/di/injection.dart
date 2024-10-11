
import 'package:get_it/get_it.dart';
import 'package:injectable/injectable.dart';

import 'injection.config.dart';



final getIt = GetIt.instance;



@InjectableInit(
  initializerName: r'$initGetIt', // default
  preferRelativeImports: true, // default
  asExtension: false, // default
)
Future<void> configureDependencies({bool isUnitTest = false}) async {
  $initGetIt(getIt, environment: Environment.dev,);
}