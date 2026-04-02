from marshmallow import Schema, fields, validate, ValidationError

class UserSchema(Schema):
    # Dump_only means this field is only sent OUT (read-only), never expected IN
    id = fields.Int(dump_only=True)
    
    # Required fields with built-in validation
    username = fields.Str(required=True, validate=validate.Length(min=3, max=80))
    email = fields.Email(required=True, validate=validate.Length(max=120))

# Create instances to use in your routes
user_schema = UserSchema()
users_schema = UserSchema(many=True)