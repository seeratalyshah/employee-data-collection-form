from db import db

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    prefered_name = db.Column(db.String(100), nullable=True)
    date_of_birth = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    nationality = db.Column(db.String(50), nullable=False)
    national_id = db.Column(db.String(50), nullable=False)
    profile_image_path = db.Column(db.String(255), nullable=True)  # Added column for profile image
    passport_number = db.Column(db.String(50), nullable=True)  # Added passport number column
    marital_status = db.Column(db.String(20), nullable=False)
    current_address = db.Column(db.Text, nullable=False)
    permanent_address = db.Column(db.Text, nullable=False)
    id_expiry_date = db.Column(db.Date, nullable=False)
    passport_expiry_date = db.Column(db.Date, nullable=True)  # Added passport expiry date
    country_of_issue = db.Column(db.String(50), nullable=False)
    mobile_number = db.Column(db.String(20), nullable=False)
    whatsapp_number = db.Column(db.String(20), nullable=True)
    personal_email = db.Column(db.String(100), nullable=False)
    official_email = db.Column(db.String(100), nullable=True)
    job_title = db.Column(db.String(100), nullable=False)
    department_name = db.Column(db.String(100), nullable=False)
    date_of_joining = db.Column(db.Date, nullable=False)
    employee_type = db.Column(db.String(50), nullable=False)
    work_country = db.Column(db.String(50), nullable=False)
    work_office = db.Column(db.String(100), nullable=False)
    employee_id = db.Column(db.String(50), nullable=False)
    contract_expiry_date = db.Column(db.Date, nullable=True)
    supervisor_name = db.Column(db.String(100), nullable=False)
    supervisor_designation = db.Column(db.String(100), nullable=False)
    emergency_contact_name = db.Column(db.String(100), nullable=False)
    emergency_relationship = db.Column(db.String(50), nullable=False)
    emergency_mobile_number = db.Column(db.String(20), nullable=False)
    emergency_alternate_number = db.Column(db.String(20), nullable=True)
    emergency_email_address = db.Column(db.String(100), nullable=False)
    emergency_permanent_address = db.Column(db.Text, nullable=False)
    bank_name = db.Column(db.String(100), nullable=False)
    branch = db.Column(db.String(100), nullable=False)
    account_title = db.Column(db.String(100), nullable=False)
    account_number = db.Column(db.String(50), nullable=False)
    swift_code = db.Column(db.String(50), nullable=True)
    bank_address = db.Column(db.Text, nullable=False)
    languages_spoken = db.Column(db.String(255), nullable=False)
    special_skills = db.Column(db.Text, nullable=False)
    medical_conditions = db.Column(db.Text, nullable=True)
    signature = db.Column(db.Text, nullable=False)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Qualification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    degree = db.Column(db.String(100), nullable=False)
    institute_name = db.Column(db.String(100), nullable=False)
    year_completed = db.Column(db.Integer, nullable=False)
    country = db.Column(db.String(50), nullable=False)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class WorkExperience(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    organization = db.Column(db.String(100), nullable=False)
    job_title = db.Column(db.String(100), nullable=False)
    duration_from = db.Column(db.Date, nullable=False)
    duration_to = db.Column(db.Date, nullable=False)
    responsibilities = db.Column(db.Text, nullable=False)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    skill = db.Column(db.String(100), nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Document(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    document_type = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(50), nullable=False)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Attachment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    file_name = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(255), nullable=False)
    document_type = db.Column(db.String(100), nullable=False)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
