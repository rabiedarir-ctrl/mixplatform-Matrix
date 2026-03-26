from flask import request, abort

# Mix Entry Code Auth
def check_entry(expected_code):
    """
    تحقق من صحة رمز الدخول للمنصة قبل أي طلب.
    يقوم بقطع الطلب إذا كان الرمز غير مطابق.
    """
    received_code = request.headers.get("X-MIX-CODE")
    if not received_code:
        abort(401, description=" Missing X-MIX-CODE header")
    
    if received_code != expected_code:
        abort(403, description=" Invalid entry code")
    
    # إذا تم التحقق بنجاح، يمر الطلب
    return True


# Role & Permissions (اختياري) 
def check_role(user_role, allowed_roles):
    """
    تحقق من صلاحيات المستخدم
    """
    if user_role not in allowed_roles:
        abort(403, description=" Permission denied")
    return True
