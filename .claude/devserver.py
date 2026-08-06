#!/usr/bin/env python3
"""Static file server for the AGG demo, with browser caching disabled.

Why this exists: `python -m http.server` sends Last-Modified and no
Cache-Control, so a browser will happily reuse a cached js/*.js between reloads.
During development that means a verification pass can test *stale* code while
reporting success -- a false green. This server sends no-store on every response
and refuses to answer conditional requests with a 304.

Development tooling only. The demo itself is plain static files and does not
depend on this; serve it however you like when presenting.

Serves the docs/ directory, which is exactly what GitHub Pages publishes, so what
you see locally is what the live site serves.

Usage:  python .claude/devserver.py [port]     (default 8770)
"""
import os
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

DEFAULT_PORT = 8770
# Repo root is the parent of .claude/; the site lives in docs/ beneath it.
SITE_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'docs')


class NoCacheHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        # Drop conditional headers so we never return 304 Not Modified.
        del self.headers['If-Modified-Since']
        del self.headers['If-None-Match']
        return super().send_head()

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, fmt, *args):
        # Keep the console readable: report failures, skip the 200 firehose.
        status = str(args[1]) if len(args) > 1 else ''
        if not status.startswith('2'):
            super().log_message(fmt, *args)


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_PORT
    if not os.path.isdir(SITE_DIR):
        sys.exit('docs/ not found at %s' % SITE_DIR)
    handler = partial(NoCacheHandler, directory=SITE_DIR)
    with ThreadingHTTPServer(('127.0.0.1', port), handler) as httpd:
        print('AGG demo (no-cache) serving docs/ on http://127.0.0.1:%d' % port)
        print('This is the same tree GitHub Pages publishes.')
        sys.stdout.flush()
        httpd.serve_forever()


if __name__ == '__main__':
    main()
