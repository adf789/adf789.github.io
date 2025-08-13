#!/usr/bin/env python3
"""
MIME 타입이 올바르게 설정된 로컬 개발 서버
"""
import http.server
import socketserver
import mimetypes
import os

# JavaScript MIME 타입 강제 설정
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('application/javascript', '.mjs')

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_GET(self):
        # .js 파일에 대해 올바른 MIME 타입 설정
        if self.path.endswith('.js'):
            self.send_response(200)
            self.send_header('Content-Type', 'application/javascript')
            self.end_headers()
            
            file_path = self.path.lstrip('/')
            if os.path.exists(file_path):
                with open(file_path, 'rb') as f:
                    self.wfile.write(f.read())
        else:
            super().do_GET()

PORT = 8080
os.chdir(os.path.dirname(os.path.abspath(__file__)))

with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
    print(f"🌐 Server running at http://localhost:{PORT}/")
    print("✅ JavaScript MIME types configured correctly")
    httpd.serve_forever()