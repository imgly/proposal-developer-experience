import fs from 'fs';
import path from 'path';

/**
 * Detects the first mobile framework used in a project directory.
 * @param {string} projectDir - Absolute path to the project directory.
 * @returns {string|null} - Detected mobile framework or null.
 */
export function detectMobileFramework(projectDir) {
  const fileExists = file => fs.existsSync(path.join(projectDir, file));

  // 📱 React Native
  try {
    const pkgPath = path.join(projectDir, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      if (deps['react-native']) return 'react-native';
    }
  } catch {
    // ignore package.json issues
  }

  // 🧱 Flutter
  if (fileExists('pubspec.yaml') && fileExists('lib/main.dart')) {
    return 'flutter';
  }

  // 🤖 Native Android (Kotlin/Java)
  if (
    fileExists('build.gradle') ||
    fileExists('android/app/src/main/AndroidManifest.xml')
  ) {
    return 'android-native';
  }

  // 🍏 Native iOS (Swift/Obj-C)
  const hasIosFiles =
    fs.readdirSync(projectDir).some(f =>
      f.endsWith('.xcodeproj') || f.endsWith('.xcworkspace')
    ) || fileExists('ios/Info.plist');

  if (hasIosFiles) {
    return 'ios-native';
  }

  return null;
}
