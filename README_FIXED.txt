# AI-Based Smart Allocation Engine for PM Internship

## Fixed in this version

- Student/company registration now matches the actual HTML field IDs.
- Login is connected to `common.js` and `login.js`.
- No admin login.
- Students and companies are user-created; no pre-saved student/company records.
- Company profile and student profile remain role-specific.
- Companies can add internships after saving their company profile.
- Students can view internships and run AI matching.
- Removed accidental CSS that had been appended to `allocation.js`, which caused a JavaScript syntax error.
- Dashboard JavaScript was corrected.
- Main application layout was corrected.

## Test

1. Open `index.html`.
2. Open `register.html`.
3. Register a Student with one email.
4. Return to login and login with that account.
5. Logout.
6. Register a Company using a different email.
7. Login as the Company.
8. Open Company Profile and save the company profile.
9. Open Internships and add an internship.
10. Logout.
11. Login as the Student.
12. Open My Profile and save academic/skill details.
13. Open Internships and confirm the company internship appears.
14. Open AI Allocation and run the matching.

## If old test data causes confusion

Open browser Developer Tools (F12) -> Console and run:

localStorage.clear();

Then refresh `index.html` and register again.


## Final allocation behavior

The student only needs to click **Find Best Matches**.
The system calculates all matches, selects the highest eligible match
(score >= 60), saves it as an allocation, and the Reports page can then
display the allocation automatically.
