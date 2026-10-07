export interface TeamMemberType {
  id?: number;
  slug?: string;
  name?: string;
  designation?: string;
  social?: {
    facebook?: string;
    facebook_url?: string;
    twitter?: string;
    twitter_url?: string;
    instagram?: string;
    instagram_url?: string;
    linkedin?: string;
    linkedin_url?: string;
  };
  year_of_expertise?: string;
  expertise?: string;
  phone?: string;
  email?: string;
  biography?: string;
  about?: string;
  about_skills?: string;
  skills?: {
    project_management?: number;
    client_relationship?: number;
    soft_skill?: number;
  };
  image?: string;
}

export interface TeamMemberDataType {
  data: TeamMemberType;
}
