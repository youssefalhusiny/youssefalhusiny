from functools import wraps
import time

# قاموس لتخزين عناوين الـ IP وعدد طلباتهم (مبسط جداً لأغراض الشرح)
# في التطبيقات الحقيقية، يجب استخدام قاعدة بيانات مثل Redis
ip_records = {}

def add_security_headers(func):
    """
    مُزخرف (Decorator) لإضافة ترويسات الأمان (Security Headers) الأساسية.
    هذه الترويسات تخبر المتصفح بكيفية التعامل مع الموقع وتغلق العديد من الثغرات الشائعة.
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        # تنفيذ الدالة الأصلية للحصول على الاستجابة
        response = func(*args, **kwargs)
        
        # 1. X-Content-Type-Options: يمنع المتصفح من تخمين نوع الملف، ويجبره على الالتزام بالنوع المرسل.
        # يحمي من ثغرات رفع الملفات الخبيثة.
        response.headers['X-Content-Type-Options'] = 'nosniff'
        
        # 2. X-Frame-Options: يمنع وضع موقعك داخل إطار (Iframe) في موقع آخر.
        # يحمي من هجمات Clickjacking (اختطاف النقرات).
        response.headers['X-Frame-Options'] = 'SAMEORIGIN'
        
        # 3. Strict-Transport-Security (HSTS): يجبر المتصفح على استخدام اتصال مشفر HTTPS فقط.
        response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
        
        # 4. Content-Security-Policy (CSP): تحدد من أين يمكن تحميل الموارد (سكربتات، صور، إلخ).
        # هنا نسمح بالتحميل من نفس الموقع فقط ('self'). يحمي بشكل كبير من ثغرات XSS.
        response.headers['Content-Security-Policy'] = "default-src 'self'"
        
        return response
    return wrapper

def rate_limiter(max_requests, window_seconds):
    """
    مُزخرف (Decorator) لتقييد عدد الطلبات (Rate Limiting).
    يحمي من هجمات حجب الخدمة (DDoS) البسيطة أو هجمات التخمين (Brute-force).
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            # نفترض أننا نستخدم إطار عمل مثل Flask للحصول على IP الزائر
            # في Flask ستكون: from flask import request; ip = request.remote_addr
            # هنا سنضع IP وهمي للتوضيح
            client_ip = "127.0.0.1" 
            
            current_time = time.time()
            
            if client_ip not in ip_records:
                ip_records[client_ip] = []
            
            # تنظيف الطلبات القديمة التي تجاوزت النافذة الزمنية
            ip_records[client_ip] = [req_time for req_time in ip_records[client_ip] 
                                     if current_time - req_time < window_seconds]
            
            # التحقق من عدد الطلبات
            if len(ip_records[client_ip]) >= max_requests:
                # في Flask يمكنك استخدام: abort(429) (Too Many Requests)
                return "خطأ: تم تجاوز الحد المسموح به من الطلبات. يرجى المحاولة لاحقاً.", 429
            
            # تسجيل الطلب الحالي
            ip_records[client_ip].append(current_time)
            
            return func(*args, **kwargs)
        return decorator
    return decorator

# --- مثال على كيفية الاستخدام مع إطار عمل افتراضي (مثل Flask) ---
#
# @app.route('/')
# @rate_limiter(max_requests=5, window_seconds=60) # يسمح بـ 5 طلبات كل دقيقة
# @add_security_headers                          # يضيف ترويسات الأمان
# def home():
#     return make_response("مرحباً بك في الموقع المحمي!")
