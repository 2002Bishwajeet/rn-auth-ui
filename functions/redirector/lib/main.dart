import 'dart:async';
import 'dart:convert';
import 'dart:io';

/// Redirector Function
/// Redirects you to your Native App
/// Used for resetting password, verifying email, etc.
Future<dynamic> main(final context) async {
  final scheme = Platform.environment['APP_SCHEME'];

  final validSchemes = ['localhost'];
  if (scheme != null) {
    validSchemes.add(scheme);
  }

  context.log('full url: ${context.req.url}');
  if (context.req.method == 'GET') {
    final path = context.req.path as String;
    context.log('Path: $path');
    if (path.contains('/reset-password')) {
      final queryParams = context.req.query as Map<String, dynamic>;
      context.log('Query Params: ${jsonEncode(queryParams)}');
      if (queryParams.isEmpty) {
        return context.res.send('No Query Params', 400, {
          'content-type': 'text/plain',
        });
      }

      final scheme = queryParams['scheme'] as String?;
      final secret = queryParams['secret'] as String?;
      final userId = queryParams['userId'] as String?;
      final expires = queryParams['expires'] as String?;

      if (scheme == null || secret == null || userId == null || expires == null) {
        return context.res.send('Missing Query Params', 400, {
          'content-type': 'text/plain',
        });
      } else if (!validSchemes.contains(scheme)) {
        context.log('Invalid Scheme. $scheme');
        return context.res.send('Invalid Scheme. If its correct, please add in your env in your cloud function', 400, {
          'content-type': 'text/plain',
        });
      }
      return context.res.redirect('$scheme://reset-password?secret=$secret&userId=$userId&expires=$expires', 301);
    }

    // Add more redirection code here. E.g for verifying email, etc.

    if (path.startsWith('/'))
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