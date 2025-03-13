import os
import json
import logging
import uuid
from datetime import datetime
from flask import request, jsonify
from werkzeug.utils import secure_filename
from app import app, logger
from db import db
from models import Employee, Qualification, WorkExperience, Skill, Document, Attachment

UPLOAD_FOLDER = 'Uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def generate_unique_filename(filename):
    """Generate a unique filename by prepending a UUID."""
    unique_id = str(uuid.uuid4())
    name, extension = os.path.splitext(secure_filename(filename))
    return f"{unique_id}{extension}"

def parse_date(date_str):
    """
    Parse a date string in various formats to a datetime.date object.
    Handles both ISO format with time and simple YYYY-MM-DD format.
    """
    if not date_str:
        return None
        
    try:
        # Try the full ISO format first
        return datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%S.000Z").date()
    except ValueError:
        try:
            # Try simple date format
            return datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            # Log the error and return None for invalid dates
            logger.error(f"Could not parse date: {date_str}")
            return None

@app.route('/employees', methods=['GET'])
def get_employees():
    employees = Employee.query.all()
    return jsonify([employee.as_dict() for employee in employees])

@app.route('/employees/<int:id>', methods=['GET'])
def get_employee(id):
    employee = Employee.query.get_or_404(id)
    return jsonify(employee.as_dict())

@app.route('/employees', methods=['POST'])
def create_employee():
    try:
        # Parse the JSON data from the form
        data = json.loads(request.form['data'])
        files = request.files
        
        logger.info("Received data and files")
        logger.info(f"Files: {list(files.keys())}")

        personal_info = data['personal_information']
        employment_details = data['employement_details']
        qualifications = data['educational_qualification']
        work_experiences = data['work_experiences']
        skills_areas_expertise = data['skills_areas_expertise']
        research_background = data['research_background']
        emergency_contact_details = data['emergency_contact_details']
        banking_salary_info = data['banking_Salary_information']
        additional_info = data['additional_information']
        file_uploads = data['file_uploads']
        
        # Handle profile image upload if available
        profile_image_path = None
        if 'profile_image' in files:
            profile_img = files['profile_image']
            if profile_img and profile_img.filename:
                # Create a unique filename for the profile image
                profile_filename = generate_unique_filename(profile_img.filename)
                profile_image_path = os.path.join(UPLOAD_FOLDER, profile_filename)
                profile_img.save(profile_image_path)
                logger.info(f"Profile image saved at: {profile_image_path}")
        
        # Handle passport fields
        passport_number = personal_info.get('passport_number')
        passport_expiry_date = None
        if 'passport_expiry_date' in personal_info and personal_info['passport_expiry_date']:
            if isinstance(personal_info['passport_expiry_date'], dict) and 'startDate' in personal_info['passport_expiry_date']:
                passport_expiry_date = parse_date(personal_info['passport_expiry_date']['startDate'])
            elif isinstance(personal_info['passport_expiry_date'], str):
                passport_expiry_date = parse_date(personal_info['passport_expiry_date'])

        new_employee = Employee(
            full_name=personal_info['full_name'],
            prefered_name=personal_info.get('prefered_name'),
            date_of_birth=parse_date(personal_info['date_Of_birth']['startDate']),
            gender=personal_info['gender']['value'],
            nationality=personal_info['nationality']['value'],
            national_id=personal_info['national_id'],
            profile_image_path=profile_image_path,  # Save profile image path
            passport_number=passport_number,  # Added passport number
            marital_status=personal_info['marital_status']['value'],
            current_address=personal_info['current_address'],
            permanent_address=personal_info['permanent_address'],
            id_expiry_date=parse_date(personal_info['id_expiry_date']['startDate']),
            passport_expiry_date=passport_expiry_date,  # Added passport expiry date
            country_of_issue=personal_info['country_of_issue']['value'],
            mobile_number=personal_info['mobile_number'],
            whatsapp_number=personal_info.get('whatsapp_number'),
            personal_email=personal_info['personal_email'],
            official_email=personal_info.get('official_email'),
            job_title=employment_details['job_title'],
            department_name=employment_details['department_name'],
            date_of_joining=parse_date(employment_details['date_Of_joining']['startDate']),
            employee_type=employment_details['employee_type']['value'],
            work_country=employment_details['work_country']['value'],
            work_office=employment_details['work_office'],
            employee_id=employment_details['employee_id'],
            contract_expiry_date=parse_date(employment_details['contract_expiry_date']['startDate']),
            supervisor_name=employment_details['super_visors_name'],
            supervisor_designation=employment_details['supervisors_designation'],
            emergency_contact_name=emergency_contact_details['contact_name'],
            emergency_relationship=emergency_contact_details['relationship'],
            emergency_mobile_number=emergency_contact_details['emergency_mobile_number'],
            emergency_alternate_number=emergency_contact_details.get('alternate_number'),
            emergency_email_address=emergency_contact_details['email_address'],
            emergency_permanent_address=emergency_contact_details['emergency_permanent_address'],
            bank_name=banking_salary_info['bank_name'],
            branch=banking_salary_info['branch'],
            account_title=banking_salary_info['account_title'],
            account_number=banking_salary_info['account_number'],
            swift_code=banking_salary_info.get('swif_code'),
            bank_address=banking_salary_info['bank_address'],
            languages_spoken=additional_info['langauge_spoken'],
            special_skills=additional_info['special_skills'],
            medical_conditions=additional_info.get('any_medical_conditions'),
            signature=data['employee_signature']
        )
        db.session.add(new_employee)
        db.session.commit()
        logger.info(f"Employee created with ID: {new_employee.id}")

        # Add qualifications
        for qualification in qualifications:
            new_qualification = Qualification(
                employee_id=new_employee.id,
                degree=qualification['degree'],
                institute_name=qualification['intituteName'],
                year_completed=qualification['yearCompleted'],
                country=qualification['country']['value']
            )
            db.session.add(new_qualification)
        logger.info(f"Added {len(qualifications)} qualifications")

        # Add work experiences
        for experience in work_experiences:
            new_experience = WorkExperience(
                employee_id=new_employee.id,
                organization=experience['organization'],
                job_title=experience['jobTitle'],
                duration_from=parse_date(experience['duration']['startDate']),
                duration_to=parse_date(experience['duration']['endDate']),
                responsibilities=experience['responsibilities']
            )
            db.session.add(new_experience)
        logger.info(f"Added {len(work_experiences)} work experiences")

        # Add skills
        for skill in skills_areas_expertise['soft_skills']['soft_skills']:
            new_skill = Skill(
                employee_id=new_employee.id,
                category=str(skill['category_id']),
                skill=skill['skill_name'],
                rating=int(skill['rating'])
            )
            db.session.add(new_skill)
        logger.info("Added skills")

        # Add documents
        for document in file_uploads['documents_status']:
            new_document = Document(
                employee_id=new_employee.id,
                document_type=document['name'],
                status=document['status']
            )
            db.session.add(new_document)
        logger.info("Added document statuses")

        # Add attachments
        for index, attachment in enumerate(file_uploads['documents_uploaded']):
            file_key = f"file{index}"
            if file_key in files:
                file = files[file_key]
                if file and file.filename:
                    # Create a unique filename for each attachment
                    unique_filename = generate_unique_filename(file.filename)
                    file_path = os.path.join(UPLOAD_FOLDER, unique_filename)
                    file.save(file_path)
                    logger.info(f"Saved file to: {file_path}")
                    
                    new_attachment = Attachment(
                        employee_id=new_employee.id,
                        file_name=attachment.get('fileName', file.filename),
                        file_path=file_path,
                        document_type=attachment.get('documentType', "Unknown")  # Use documentType from the attachment data
                    )
                    db.session.add(new_attachment)
                    logger.info(f"Added attachment with document type: {attachment.get('documentType', 'Unknown')}")
                else:
                    logger.warning(f"File at index {index} is missing or invalid.")
            else:
                logger.warning(f"File key {file_key} not found in files.")

        db.session.commit()
        logger.info(f"All data committed for employee ID: {new_employee.id}")
        return jsonify(new_employee.as_dict()), 201
    
    except Exception as e:
        logger.error(f"Error in create_employee: {str(e)}")
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/employees/<int:id>', methods=['PUT'])
def update_employee(id):
    data = request.get_json()
    employee = Employee.query.get_or_404(id)
    employee.full_name = data['full_name']
    employee.prefered_name = data.get('prefered_name')
    employee.date_of_birth = data['date_of_birth']
    employee.gender = data['gender']
    employee.nationality = data['nationality']
    employee.national_id = data['national_id']
    employee.marital_status = data['marital_status']
    employee.current_address = data['current_address']
    employee.permanent_address = data['permanent_address']
    employee.id_expiry_date = data['id_expiry_date']
    employee.country_of_issue = data['country_of_issue']
    employee.mobile_number = data['mobile_number']
    employee.whatsapp_number = data.get('whatsapp_number')
    employee.personal_email = data['personal_email']
    employee.official_email = data.get('official_email')
    employee.job_title = data['job_title']
    employee.department_name = data['department_name']
    employee.date_of_joining = data['date_of_joining']
    employee.employee_type = data['employee_type']
    employee.work_country = data['work_country']
    employee.work_office = data['work_office']
    employee.employee_id = data['employee_id']
    employee.contract_expiry_date = data.get('contract_expiry_date')
    employee.supervisor_name = data['supervisor_name']
    employee.supervisor_designation = data['supervisor_designation']
    employee.emergency_contact_name = data['emergency_contact_name']
    employee.emergency_relationship = data['emergency_relationship']
    employee.emergency_mobile_number = data['emergency_mobile_number']
    employee.emergency_alternate_number = data.get('emergency_alternate_number')
    employee.emergency_email_address = data['emergency_email_address']
    employee.emergency_permanent_address = data['emergency_permanent_address']
    employee.bank_name = data['bank_name']
    employee.branch = data['branch']
    employee.account_title = data['account_title']
    employee.account_number = data['account_number']
    employee.swift_code = data.get('swift_code')
    employee.bank_address = data['bank_address']
    employee.languages_spoken = data['languages_spoken']
    employee.special_skills = data['special_skills']
    employee.medical_conditions = data['medical_conditions']
    employee.signature = data['signature']
    db.session.commit()
    return jsonify(employee.as_dict())

@app.route('/employees/<int:id>', methods=['DELETE'])
def delete_employee(id):
    employee = Employee.query.get_or_404(id)
    db.session.delete(employee)
    db.session.commit()
    return '', 204

# Helper method to convert model to dictionary
def as_dict(self):
    return {c.name: getattr(self, c.name) for c in self.__table__.columns}


