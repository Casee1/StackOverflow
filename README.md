# StackOverflow

Intro
I design and implement a simple version of StackOverflow.
• My system will have only one type of user
• No actions should be possible if the user is not logged in. The user’s passwords should
be store in the database encrypted.

• Users shall be able to ask questions. Each question must have an author, title, text, 
creation date & time, picture and one or more tags. If an appropriate tag does not exist, 
the user must be able to create one.
• The list of questions shall be displayed, sorted by creation date. The most recent 
question should be displayed first.
• Questions may be edited or deleted by their author.
• The user must be able to filter questions by tag, via a text search, via users or for his 
own questions. The text search should check the question title.

• Each question may be answered one or more times by any user (including the original 
author).
• Each answer must have an author, text, picture and creation date & time.
• Answers may be edited or deleted by their author.
• When displaying a question individually, the list of answers must also be displayed

• Users may vote questions and answers (upvote and downvote, like and dislike).
• Each user may only vote once on each question or answer. Users cannot vote on their 
own answers or questions (Like&Dislike).
• On each voted question or answer, the vote count must be displayed
(vote count = upvote/like count - downvote/dislike count). The vote count can be 
negative.
• The answers for a question must be sorted by their vote count. Answers with the highest 
vote count must be displayed first.

• Based on upvotes and downvotes or likes and dislikes, the system must compute a user 
score with the following rules:
  o Each user starts with 0 points.
  o Users gain points when:
    • Their question is voted up (+2.5 points per vote),
    • Their answer is voted up (+5 points per vote).
  o  Users lose points when:
    • Their question is voted down (-1.5 points per vote),
    • Their answer is voted down (-2.5 points per vote),
    • They down vote an answer of another user (-1.5 point).
• The user score shall be displayed next to the author's name on each question / answer.
• The score can be negative.

• Moderators are users with special privileges. They shall be able to:
    o Remove questions or answers if inappropriate,
    o Edit any question or answer on the site,
    o Ban users from the site indefinitely in case of bad behavior.
    o The users can be unbanned by the moderator. 
• Banned users must see a message indicating that they were banned when trying to login 
and should be unable to perform any other actions. (cannot access the application 
neither via url)
• The banned users must receive an e-mail & sms when they are banned.


