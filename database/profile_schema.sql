-- Database Schema for User Profiles
-- This schema matches the 'name' attributes of all fields on the profile page.
-- Optimized for future form actions and database integration.

CREATE TABLE profiles (
    -- Link to user (assuming you use an auth provider like NextAuth)
    user_id VARCHAR(255) PRIMARY KEY,
    
    -- ==========================================
    -- UPPER PROFILE (ProfileMain / MainDetails)
    -- ==========================================
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    college VARCHAR(255),
    course VARCHAR(255),
    address TEXT,
    dob VARCHAR(20),     -- Format: dd/MM/yyyy (from DatePicker)
    gender VARCHAR(50),
    
    -- ==========================================
    -- CAREER PREFERENCES (DownProfileComponent)
    -- ==========================================
    preferred_job_type VARCHAR(255),
    availability VARCHAR(255),
    preferred_location TEXT,
    
    -- ==========================================
    -- EDUCATION (EducationBlockProfile)
    -- ==========================================
    
    -- Highest Qualification
    degree VARCHAR(255),
    college_edu VARCHAR(255),
    education_duration_start VARCHAR(10),
    education_duration_end VARCHAR(10),
    
    -- Class XII
    class_xii VARCHAR(255),
    class_xii_board VARCHAR(255),
    class_xii_details_start VARCHAR(10),
    class_xii_details_end VARCHAR(10),
    
    -- Class X
    class_x VARCHAR(255),
    class_x_board VARCHAR(255),
    class_x_details_start VARCHAR(10),
    class_x_details_end VARCHAR(10),
    
    -- ==========================================
    -- KEY SKILLS (DownProfileComponent)
    -- ==========================================
    skills TEXT, -- Typically comma-separated
    
    -- ==========================================
    -- LANGUAGES (LanguageRow)
    -- ==========================================
    language_1_name VARCHAR(100),
    language_1_proficiency VARCHAR(100),
    language_2_name VARCHAR(100),
    language_2_proficiency VARCHAR(100),
    
    -- ==========================================
    -- INTERNSHIPS (DownProfileComponent)
    -- ==========================================
    internship_company VARCHAR(255),
    internship_duration_start VARCHAR(10),
    internship_duration_end VARCHAR(10),
    
    -- ==========================================
    -- PROJECTS & SUMMARY (DownProfileComponent)
    -- ==========================================
    projects TEXT,
    profile_summary TEXT,
    
    -- ==========================================
    -- ACCOMPLISHMENTS (DownProfileComponent)
    -- ==========================================
    certifications TEXT,
    awards TEXT,
    clubs TEXT,
    
    -- ==========================================
    -- COMPETITIVE EXAMS (DownProfileComponent)
    -- ==========================================
    exam_name VARCHAR(255),
    exam_rank VARCHAR(255),
    
    -- ==========================================
    -- RESUME (DownProfileComponent)
    -- ==========================================
    resume_path VARCHAR(500), -- Path to the uploaded file
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Note: All field names above correspond directly to the 'name' attribute in your HTML/React components.
-- Use these in your future Form Action like:
-- const data = await formData.get('preferred_job_type');
