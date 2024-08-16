import 'dart:async';
import 'dart:io';

extension ListExtension on List<String> {
  bool matchesScheme(String scheme) {
    if (this.isEmpty) return false;
    for (final item in this) {
      if (scheme.contains(item)) {
        return true;
      }
    }
    return false;
  }
}

/// Redirector Function
/// Redirects you to your Native App
/// Used for resetting password, verifying email, etc.
Future<dynamic> main(final context) async {
  final scheme = Platform.environment['APP_SCHEME'];

  final validSchemes = ['localhost', '192.168.1.2']; // localhost schemes
  if (scheme != null) {
    validSchemes.add(scheme);
  }

  if (context.req.method == 'GET') {
    final path = context.req.path as String;
    context.log('Path: $path');
    if (path.contains('/reset-password')) {
      final queryParams = context.req.query as Map<String, dynamic>;
      if (queryParams.isEmpty) {
        return context.res.send('No Query Params', 400, {
          'content-type': 'text/plain',
        });
      }

      final scheme = queryParams['scheme'] as String?;
      final secret = queryParams['secret'] as String?;
      final userId = queryParams['userId'] as String?;
      final expire = queryParams['expire'] as String?;
      if (scheme == null || secret == null || userId == null || expire == null) {
        context.log('Missing Query Params: {scheme: $scheme, secret: $secret, userId: $userId, expire: $expire}');
        return context.res.send('Missing Query Params', 400, {
          'content-type': 'text/plain',
        });
      }
      final decodedScheme = Uri.decodeComponent(scheme);

      if (!validSchemes.matchesScheme(decodedScheme)) {
        context.log('Invalid Scheme. $decodedScheme');
        return context.res.send('Invalid Scheme. If its correct, please add in your env in your cloud function', 400, {
          'content-type': 'text/plain',
        });
      }

      return context.res.redirect('${decodedScheme}reset-password?secret=$secret&userId=$userId&expires=$expire', 301);
    }

    // Add more redirection code here. E.g for verifying email, etc.

    if (path.startsWith('/') || path.isEmpty)
      return context.res.send('Nothing to redirect to ;)', 204, {
        'content-type': 'text/plain',
      });
  } else {
    /// Only Get Requests are allowed
    final method = context.req.method as String;
    context.res.error('Method Not Allowed $method', 405);
    return context.res.send('$method Method Not Allowed', 405, {
      'content-type': 'text/plain',
    });
  }
}
