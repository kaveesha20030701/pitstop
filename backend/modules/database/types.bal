// Copyright (c) 2026 WSO2 LLC. (https://www.wso2.com).
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import pitstop.types;

import ballerina/sql;

# [Configurable] Database configuration.
type DatabaseConfig record {|
    # Database Host
    string host;
    # Database User
    string user;
    # Database Password
    string password;
    # Database Name
    string database;
    # Maximum open connections
    int maxOpenConnections = 10;
    # Maximum lifetime of a connection
    decimal maxConnectionLifeTime = 180.0;
    # Minimum idle time of a connection  
    int minIdleConnections = 5;
|};

# Route payload.
public type RoutePayload record {|
    # Parent ID
    int parentId;
    # Page title
    string title;
    # Page description
    string? description = ();
    # Page thumbnail
    string? thumbnail = ();
    # Route Path item name
    string label;
    # Navbar menu item
    string menuItem;
    # Page custom theme
    types:CustomTheme? customPageTheme = ();
    # Page visibility
    boolean isVisible;
|};

# Custom button record.
public type CustomButton record {|
    # Button ID
    int id;
    # Content ID
    @sql:Column {name: "content_id"}
    string contentId;
    # Button label
    string label;
    # Button description
    string? description = ();
    # Button icon
    string? icon = ();
    # Button color
    string? color = ();
    # Button action type
    string action;
    # Button action value
    @sql:Column {name: "action_value"}
    string? actionValue = ();
    # Button visibility
    @sql:Column {name: "is_visible"}
    boolean isVisible;
    # Button order
    @sql:Column {name: "button_order"}
    int 'order;
    # Created timestamp
    @sql:Column {name: "created_at"}
    string? createdAt = ();
    # Updated timestamp
    @sql:Column {name: "updated_at"}
    string? updatedAt = ();
|};

# Custom button create payload.
public type CustomButtonCreatePayload record {|
    # Content ID
    string contentId;
    # Button label
    string label;
    # Button description
    string? description = ();
    # Button icon
    string? icon = ();
    # Button color
    string? color = ();
    # Button action type
    string? action = ();
    # Button action value
    string? actionValue = ();
    # Button visibility
    boolean? isVisible;
    # Button order
    int 'order;
|};

# Custom button update payload.
public type CustomButtonUpdatePayload record {|
    # Content ID
    string? contentId = ();
    # Button label
    string? label = ();
    # Button description
    string? description = ();
    # Button icon
    string? icon = ();
    # Button color
    string? color = ();
    # Button action type
    string? action = ();
    # Button action value
    string? actionValue = ();
    # Button visibility
    boolean? isVisible = ();
    # Button order
    int? 'order = ();
|};

# Page response record.
public type PageResponse record {|
    # Route ID
    @sql:Column {name: "route_id"}
    int routeId;
    # Page title
    string title;
    # Page description
    string description?;
    # Page thumbnail
    string thumbnail?;
    # Custom Page theme
    @sql:Column {name: "styling_info"}
    string? customPageTheme;
    # Sub page visibility
    boolean isVisible;
|};

# Content response record.
public type ContentResponse record {|
    # Id of the content
    @sql:Column {name: "content_id"}
    int contentId;
    # Section ID
    @sql:Column {name: "section_id"}
    int? sectionId;
    # Link to redirect to the content
    @sql:Column {name: "content_link"}
    string contentLink;
    # Type of the content
    @sql:Column {name: "content_type"}
    string contentType;
    # Content subtype of the content
    @sql:Column {name: "content_sub_type"}
    string? contentSubtype;
    # Thumbnail image url
    string thumbnail?;
    # Content notes
    string note?;
    # Content description
    string description;
    # Likes count of the content
    @sql:Column {name: "likes_count"}
    int likesCount;
    # likes for the content
    boolean status?;
    # Custom theme for the content
    @sql:Column {name: "styling_info"}
    string? customContentTheme;
    # Content order
    @sql:Column {name: "content_order"}
    int contentOrder;
    # content created date
    @sql:Column {name: "created_on"}
    string createdOn;
    # number of comments
    @sql:Column {name: "comment_count"}
    int commentCount;
    # Content tags
    string tags?;
    #route id
    @sql:Column {name: "route_id"}
    int? routeId;
    # Content visibility
    @sql:Column {name: "is_visible"}
    boolean isVisible;
    # Content reuse 
    @sql:Column {name: "is_reused"}
    boolean isReused;
|};

# Section helper record.
public type Section record {|
    # Section Id
    @sql:Column {name: "section_id"}
    int sectionId;
    # Section title
    string title;
    # Section description
    string description?;
    # Type of the section
    @sql:Column {name: "section_type"}
    string sectionType;
    # Image url
    @sql:Column {name: "image_url"}
    string imageUrl?;
    # Redirect url
    @sql:Column {name: "redirect_url"}
    string redirectUrl?;
    # Section order
    @sql:Column {name: "section_order"}
    int sectionOrder;
    # Custom section theme
    @sql:Column {name: "styling_info"}
    string customSectionTheme?;
    # Tags associated with the section
    @sql:Column {name: "tags"}
    string tags?;
|};

# Pinned content response record.
public type PinnedContentResponse record {|
    # Id of the content
    @sql:Column {name: "content_id"}
    int contentId;
    # Route ID
    @sql:Column {name: "section_id"}
    int? sectionId;
    # Link to redirect to the content
    @sql:Column {name: "content_link"}
    string contentLink;
    # Type of the content
    @sql:Column {name: "content_type"}
    string contentType;
    # Content subtype of the content
    @sql:Column {name: "content_sub_type"}
    string? contentSubtype;
    # Thumbnail image url
    string thumbnail?;
    # Content notes
    string note?;
    # Content description
    string description;
    # Likes count of the content
    @sql:Column {name: "likes_count"}
    int likesCount;
    # likes for the content
    boolean status?;
    # Custom theme for the content
    @sql:Column {name: "styling_info"}
    string customContentTheme;
    # Content order
    @sql:Column {name: "content_order"}
    int contentOrder;
    # content created date
    @sql:Column {name: "created_on"}
    string createdOn;
    # number of comments
    @sql:Column {name: "comment_count"}
    int commentCount;
    # Content tags
    string tags;
    # route id
    @sql:Column {name: "route_id"}
    int? routeId;
    # Content visibility
    @sql:Column {name: "is_visible"}
    boolean isVisible;
    # Pinned timestamp
    @sql:Column {name: "pinned_at"}
    string pinnedAt;
    # Content reuse 
    @sql:Column {name: "is_reused"}
    boolean isReused;
|};

# Count response record.
public type CountResponse record {|
    # Count value
    int count;
|};

# Content ID response record.
public type ContentIdResponse record {|
    # Content ID
    @sql:Column {name: "content_id"}
    int contentId;
|};

# Customer testimonial record.
public type CustomerTestimonial record {|
    # Testimonial ID
    int id;
    # Logo URL
    @sql:Column {name: "logo_url"}
    string logoUrl;
    # Customer name
    string name;
    # Subtitle (optional)
    @sql:Column {name: "sub_title"}
    string? subTitle;
    # Website URL
    @sql:Column {name: "website_url"}
    string websiteUrl;
    # Link label
    @sql:Column {name: "link_label"}
    string linkLabel;
    # Created by user email
    @sql:Column {name: "created_by"}
    string? createdBy;
    # Updated by user email
    @sql:Column {name: "updated_by"}
    string? updatedBy;
    # Created timestamp
    @sql:Column {name: "created_at"}
    string? createdAt;
    # Updated timestamp
    @sql:Column {name: "updated_at"}
    string? updatedAt;
    # Shareable status
    @sql:Column {name: "is_shareable"}
    boolean isShareable;
|};

# Customer testimonial create payload.
public type CustomerTestimonialCreatePayload record {|
    # Logo URL
    string logoUrl;
    # Customer name
    string name;
    # Subtitle (optional)
    string? subTitle;
    # Website URL
    string websiteUrl;
    # Link label
    string linkLabel;
    # Shareable status
    boolean? isShareable;
|};

# Customer testimonial update payload.
public type CustomerTestimonialUpdatePayload record {|
    # Logo URL
    string? logoUrl;
    # Customer name
    string? name;
    # Subtitle (optional)
    string? subTitle;
    # Website URL
    string? websiteUrl;
    # Link label
    string? linkLabel;
    # Shareable status
    boolean? isShareable;
|};

# Content query mode enum.
public enum ContentQueryMode {
    TEXT = "text",
    TAGS = "tags",
    TAGS_AND_KEYWORDS = "tagsAndKeywords",
    TRENDING = "trending"
}

# Content query parameters record.
public type ContentFilter record {|
    # Logged-in user email
    string userEmail;
    # Search mode
    ContentQueryMode mode;
    # Text search 
    string? text = ();
    # Array of tags for filtering
    string[] tags = [];
    # Array of keywords 
    string[] keywords = [];
    # Array of trending  content descriptions 
    string[] trendingDescriptions = [];
    # Pagination limit
    int 'limit = 10;
    # Pagination offset
    int 'offset = 0;
|};

# Quiz record representing a quiz entity stored in the database.
public type Quiz record {|
    # Unique quiz identifier
    @sql:Column {name: "quiz_id"}
    int quizId;
    # Quiz title
    @sql:Column {name: "quiz_title"}
    string title;
    # Quiz description/instructions
    @sql:Column {name: "quiz_description"}
    string? description;
    # Quiz thumbnail image URL
    @sql:Column {name: "thumbnail"}
    string? thumbnail;
    # Minimum score percentage required to pass
    @sql:Column {name: "passing_score"}
    int passingScore;
    # Quiz due date (ISO format string)
    @sql:Column {name: "due_date"}
    string? dueDate;
    # JSON array of user IDs assigned to this quiz
    @sql:Column {name: "assigned_user_ids"}
    json? assignedUserIds;
    # Quiz status: DRAFTED, PUBLISHED, ARCHIVED
    @sql:Column {name: "status"}
    string status;
    # Soft delete flag
    @sql:Column {name: "is_deleted"}
    boolean isDeleted;
    # Email of user who created the quiz
    @sql:Column {name: "created_by"}
    string createdBy;
    # Email of user who last updated the quiz
    @sql:Column {name: "updated_by"}
    string? updatedBy;
    # Timestamp when quiz was created
    @sql:Column {name: "created_at"}
    string createdAt;
    # Timestamp of last update
    @sql:Column {name: "updated_at"}
    string? updatedAt;
    # Total number of questions in the quiz
    @sql:Column {name: "total_questions"}
    int totalQuestions;
|};

# Payload used to create a new quiz. Includes questions and assignment details.
public type QuizPayload record {
    # Quiz title (required)
    string title;
    # Quiz description/instructions
    string? description = ();
    # Quiz thumbnail image URL
    string? thumbnail = ();
    # Minimum passing score percentage (required)
    int passingScore;
    # Quiz due date (ISO format string)
    string? dueDate = ();
    # List of user IDs to assign quiz to
    int[] assignedUserIds = [];
    # Initial status: DRAFTED (default) or PUBLISHED
    string status = "DRAFTED";
    # Nested questions array (used for bulk creation)
    NestedQuestionPayload[] questions = [];
};

# Payload used to update quiz fields selectively.
public type UpdateQuizPayload record {
    # Updated quiz title
    string? title = ();
    # Updated quiz description/instructions
    string? description = ();
    # Updated quiz thumbnail image URL
    string? thumbnail = ();
    # Updated passing score percentage
    int? passingScore = ();
    # Updated due date
    string? dueDate = ();
    # Updated list of assigned user IDs
    int[]? assignedUserIds = ();
    # Updated quiz status
    string? status = ();
    # Updated questions (for bulk updates)
    NestedQuestionPayload[]? questions = ();
};

# NestedQuestionPayload represents a question provided within a quiz payload.
public type NestedQuestionPayload record {|
    # Question text/content (required)
    string text;
    # Question type
    string 'type;
    # Optional reference links for the question
    string[]? refLinks = ();
    # Answer options for this question
    NestedAnswerPayload[] answers = [];
|};

# NestedAnswerPayload represents an answer item within a nested question payload.
public type NestedAnswerPayload record {|
    # Answer text/content
    string text;
    # Whether this answer is correct
    boolean isCorrect;
|};

# AssignUsersPayload is used to provide a list of user IDs to assign a quiz to.
public type AssignUsersPayload record {|
    # Array of user IDs to assign to quiz
    int[] userIds;
|};

# Question record representing a persisted quiz question.
public type Question record {|
    # Unique question identifier
    @sql:Column {name: "question_id"}
    int questionId;
    # Question sequence number within the quiz
    @sql:Column {name: "question_number"}
    int questionNumber;
    # Parent quiz ID
    @sql:Column {name: "quiz_id"}
    int quizId;
    # Question text/content
    @sql:Column {name: "question_text"}
    string questionText;
    # Question type
    @sql:Column {name: "question_type"}
    string questionType;
    # JSON array of reference links for the question
    @sql:Column {name: "ref_links"}
    json? refLinks;
    # Soft delete flag
    @sql:Column {name: "is_deleted"}
    boolean isDeleted;
    # Email of user who created the question
    @sql:Column {name: "created_by"}
    string createdBy;
    # Email of user who last updated the question
    @sql:Column {name: "updated_by"}
    string? updatedBy;
    # Timestamp when question was created
    @sql:Column {name: "created_at"}
    string createdAt;
    # Timestamp of last update
    @sql:Column {name: "updated_at"}
    string? updatedAt;
|};
# QuestionPayload used when creating a question for a quiz.
public type QuestionPayload record {|
    # Question sequence number within the quiz
    int questionNumber;
    # Question text/content (required)
    string questionText;
    # Question type
    string questionType;
    # Optional reference links for the question
    string[]? refLinks = ();
|};

# UpdateQuestionPayload for partial updates to an existing question.
public type UpdateQuestionPayload record {|
    # Updated question text/content
    string? questionText;
    # Updated question type
    string? questionType;
    # Updated reference links
    string[]? refLinks = ();
|};

# Answer record representing a persisted answer option for a question.
public type Answer record {|
    # Unique answer identifier
    @sql:Column {name: "answer_id"}
    int answerId;
    # Parent question ID
    @sql:Column {name: "question_id"}
    int questionId;
    # Answer text/content
    @sql:Column {name: "answer_text"}
    string answerText;
    # Whether this is a correct answer for the question
    @sql:Column {name: "is_correct"}
    boolean isCorrect;
    # Email of user who created the answer
    @sql:Column {name: "created_by"}
    string createdBy;
    # Email of user who last updated the answer
    @sql:Column {name: "updated_by"}
    string? updatedBy;
    # Timestamp when answer was created
    @sql:Column {name: "created_at"}
    string createdAt;
    # Timestamp of last update
    @sql:Column {name: "updated_at"}
    string? updatedAt;
|};

# Public view of an answer (excludes correctness flag).
public type AnswerPublic record {|
    # Unique answer identifier
    @sql:Column {name: "answer_id"}
    int answerId;
    # Parent question ID
    @sql:Column {name: "question_id"}
    int questionId;
    # Answer text/content
    @sql:Column {name: "answer_text"}
    string answerText;
    # Timestamp when answer was created
    @sql:Column {name: "created_at"}
    string createdAt;
    # Timestamp of last update
    @sql:Column {name: "updated_at"}
    string? updatedAt;
|};

# Payload used when creating a new answer for a question.
public type AnswerPayload record {|
    # Answer text/content (required)
    string answerText;
    # Whether this is a correct answer (required)
    boolean isCorrect;
|};

# Payload used for updating an answer partially.
public type UpdateAnswerPayload record {|
    # Updated answer text/content
    string? answerText;
    # Updated correctness flag
    boolean? isCorrect;
|};

# UserAnswerPayload represents a submission from a user for a question.
public type UserAnswerPayload record {
    # Question ID being answered
    int questionId;
    # Question type
    string questionType;
    # Selected answer IDs
    int[] selectedAnswerIds;
    # Feedback text
    string? feedbackText = ();
};

# QuizResult returned to the user after completing a quiz.
public type QuizResult record {|
    # Total number of questions in the quiz
    int totalQuestions;
    # Number of questions answered correctly
    int correctAnswers;
    # Score as a percentage
    decimal scorePercentage;
    # Total marks available in the quiz
    int totalMarks;
    # Marks obtained by the user
    int marksObtained;
    # Whether the user passed the quiz
    boolean passed;
    # Whether all questions were answered
    boolean completed;
    # Array of all submitted answers
    SubmittedAnswer[] answers;
    # Optional feedback submitted by user
    QuizFeedback? feedback;
|};

# Internal/raw quiz result representation used for DB mappings.
public type QuizResultRaw record {|
    # Total number of questions in the quiz
    @sql:Column {name: "total_questions"}
    int totalQuestions;
    # Number of questions answered correctly
    @sql:Column {name: "correct_answers"}
    int? correctAnswers;
    # Score as a percentage (0-100)
    @sql:Column {name: "score_percentage"}
    decimal scorePercentage;
    # Total marks available in the quiz
    @sql:Column {name: "total_marks"}
    int? totalMarks;
    # Marks obtained by the user
    @sql:Column {name: "marks_obtained"}
    int? marksObtained;
    # Whether the user passed (1=passed, 0=failed)
    @sql:Column {name: "passed"}
    int passed;
    # Whether all questions were answered
    @sql:Column {name: "completed"}
    int completed;
|};

# UserQuizAnalytics provides aggregated analytics for a user's quiz attempts.
public type UserQuizAnalytics record {|
    # User ID
    @sql:Column {name: "user_id"}
    int userId;
    # User email address
    @sql:Column {name: "user_email"}
    string userEmail;
    # Full name of the user
    @sql:Column {name: "user_name"}
    string userName;
    # Total number of questions in the quiz
    @sql:Column {name: "total_questions"}
    int totalQuestions;
    # Number of questions answered
    int answered;
    # Number of questions answered correctly
    @sql:Column {name: "correct_answers"}
    int correctAnswers;
    # Score as a percentage (0-100)
    @sql:Column {name: "score_percentage"}
    decimal scorePercentage;
    # Total marks available in the quiz
    @sql:Column {name: "total_marks"}
    int totalMarks;
    # Marks obtained by the user
    @sql:Column {name: "marks_obtained"}
    int marksObtained;
    # Whether quiz is completed
    int completed;
    # Whether quiz is passed
    int passed;
    # Timestamp of quiz submission
    @sql:Column {name: "submitted_at"}
    string? submittedAt;
|};

# SubmittedAnswer represents an individual answer submitted by a user.
public type SubmittedAnswer record {|
    # Question ID for this answer
    @sql:Column {name: "question_id"}
    int questionId;
    # Question sequence number
    @sql:Column {name: "question_number"}
    int questionNumber;
    # Full question text
    @sql:Column {name: "question_text"}
    string questionText;
    # Question type
    @sql:Column {name: "question_type"}
    string questionType;
    # Reference links for the question
    @sql:Column {name: "ref_links"}
    json? refLinks;
    # Selected answer ID
    @sql:Column {name: "selected_answer_id"}
    int selectedAnswerId;
    # Text of the selected answer
    @sql:Column {name: "answer_text"}
    string selectedAnswerText;
    # Whether the selected answer was correct
    @sql:Column {name: "is_correct"}
    boolean isCorrect;
    # Timestamp when answer was submitted
    @sql:Column {name: "submitted_at"}
    string submittedAt;
|};

# UserAnswerDrillDown bundles submitted answers and optional feedback for drill-down views.
public type UserAnswerDrillDown record {|
    # All answers submitted by the user for the quiz
    SubmittedAnswer[] answers;
    # Optional feedback provided by the user
    QuizFeedback? feedback;
|};

# QuizFeedback represents feedback left by a user for a quiz.
public type QuizFeedback record {|
    # Unique feedback identifier
    @sql:Column {name: "feedback_id"}
    int feedbackId;
    # Quiz ID for which feedback is provided
    @sql:Column {name: "quiz_id"}
    int quizId;
    # User ID who provided the feedback
    @sql:Column {name: "user_id"}
    int userId;
    # Feedback text/comments
    @sql:Column {name: "feedback_text"}
    string feedbackText;
    # Timestamp when feedback was created
    @sql:Column {name: "created_at"}
    string createdAt;
|};

# QuizFeedbackAdmin 
public type QuizFeedbackAdmin record {|
    # Unique feedback identifier
    @sql:Column {name: "feedback_id"}
    int feedbackId;
    # Quiz ID for which feedback is provided
    @sql:Column {name: "quiz_id"}
    int quizId;
    # User ID who provided the feedback
    @sql:Column {name: "user_id"}
    int userId;
    # Full name of the user who provided feedback
    @sql:Column {name: "user_name"}
    string userName;
    # Email address of the user who provided feedback
    @sql:Column {name: "user_email"}
    string userEmail;
    # Feedback text
    @sql:Column {name: "feedback_text"}
    string feedbackText;
    # Timestamp when feedback was created
    @sql:Column {name: "created_at"}
    string createdAt;
|};

# QuizTitle is a lightweight type representing only the quiz title.
public type QuizTitle record {|
    # Quiz title
    string title;
|};
# QuizStatus is a lightweight type representing the status of a quiz.
public type QuizStatus record {|
    # Quiz status value
    string status;
|};
