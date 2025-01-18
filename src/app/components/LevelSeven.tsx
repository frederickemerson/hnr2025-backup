"use client";
import {useEffect, useRef, useState} from "react";
import {distance} from "fastest-levenshtein";

const text = `
Terms and Conditions for Submission of Vacation Request

1. Introduction

These Terms and Conditions (hereinafter referred to as the "Terms") govern the submission of a vacation request (hereinafter referred to as the "Request") by an employee (hereinafter referred to as the "Employee") to their employer (hereinafter referred to as the "Employer" or "Company"). The Employee acknowledges and agrees that by submitting a Request, they are bound by these Terms in their entirety, without reservation or exception. The Employee further acknowledges that they have read, understood, and agree to be bound by these Terms, including any amendments thereto, which may be made by the Company at any time, in its sole and absolute discretion.

2. Definitions

2.1. "Business Day" means any day other than a Saturday, Sunday, or a day on which the Company is closed for business, as determined by the Company in its sole discretion.

2.2. "Effective Date" means the date on which the Request is approved by the Employer, as communicated to the Employee in writing.

2.3. "Vacation Period" means the continuous period of time during which the Employee is authorized to be absent from work, as specified in the approved Request.

2.4. "Workload Assessment" means the evaluation conducted by the Employer to determine the impact of the Employee's absence on the Company's operations during the Vacation Period.

2.5. "Substitute Arrangement" means any temporary replacement or delegation of responsibilities assigned to the Employee during the Vacation Period, as determined by the Employer.

3. Submission of Request

3.1. The Employee shall submit the Request in the format prescribed by the Company, which may include, but is not limited to, an electronic form, a written letter, or any other method designated by the Employer.

3.2. The Request shall include, but is not limited to, the following information:

a. The Employee's full name and employee identification number.

b. The specific start and end dates of the Vacation Period, inclusive of any partial days.

c. The total number of vacation days requested, calculated in accordance with the Company's vacation accrual policy.

d. A detailed explanation of the purpose of the vacation, including any travel plans or activities that may impact the Employee's ability to return to work promptly at the end of the Vacation Period.

e. Any other information that the Employer may require, in its sole discretion, to assess the Request.

3.3. The Employee shall ensure that the Request is submitted at least [X] Business Days in advance of the proposed start date of the Vacation Period, unless otherwise approved by the Employer in writing.

3.4. The Employee shall be solely responsible for ensuring the accuracy and completeness of the information provided in the Request. Any inaccuracies or omissions may result in the denial of the Request or disciplinary action, as determined by the Employer.

4. Approval Process

4.1. The Employer reserves the right to approve or deny the Request in its sole and absolute discretion, without being required to provide any reason for its decision.

4.2. The Employer shall conduct a Workload Assessment to determine the potential impact of the Employee's absence on the Company's operations during the Vacation Period. The Employer may require the Employee to provide additional information or documentation to facilitate this assessment.

4.3. In the event that the Employer approves the Request, it shall do so by providing written confirmation to the Employee, which shall include the Effective Date and any conditions or restrictions associated with the approval.

4.4. The Employer reserves the right to modify the proposed Vacation Period, including but not limited to, adjusting the start or end dates, shortening the duration, or requiring the Employee to take unpaid leave, in the event that the Workload Assessment indicates that the Employee's absence would have an adverse impact on the Company's operations.

4.5. The Employee shall not be entitled to any compensation or benefits during the Vacation Period, except as otherwise provided in the Company's vacation policy or applicable law.

5. Cancellation and Rescheduling

5.1. The Employee may cancel or reschedule the Vacation Period by providing written notice to the Employer at least [X] Business Days in advance of the originally scheduled start date.

5.2. In the event that the Employee cancels or reschedules the Vacation Period less than [X] Business Days in advance of the originally scheduled start date, the Employer reserves the right to require the Employee to forfeit any accrued vacation days associated with the original Request, or to require the Employee to make up any time lost during the Vacation Period, at the Employer's sole discretion.

5.3. The Employer reserves the right to cancel or reschedule the Vacation Period at any time, with or without cause, by providing written notice to the Employee. In the event of such cancellation or rescheduling, the Employee shall not be entitled to any compensation or benefits, except as required by applicable law.

6. Consequences of Non-Compliance

6.1. The Employee acknowledges that failure to comply with any of the terms and conditions set forth herein may result in disciplinary action, up to and including termination of employment, in accordance with the Company's policies and applicable law.

6.2. The Employee further acknowledges that any unauthorized absence from work during the Vacation Period, including but not limited to, failure to return to work at the end of the approved Vacation Period, shall be considered unauthorized leave and may result in disciplinary action, up to and including termination of employment.

7. Indemnification

7.1. The Employee agrees to indemnify, defend, and hold harmless the Company, its affiliates, officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or relating to the Employee's use of vacation time, including but not limited to, any accidents, injuries, or damages that may occur during the Vacation Period.

8. Governing Law

8.1. These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the Employee is employed, without regard to its conflict of law principles.

8.2. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of the aforementioned jurisdiction.

9. Entire Agreement

9.1. These Terms constitute the entire agreement between the Employee and the Employer with respect to the submission of a vacation request and supersede all prior or contemporaneous agreements, understandings, or representations, whether oral or written, relating to the subject matter hereof.

9.2. Any amendments or modifications to these Terms must be made in writing and signed by both the Employee and an authorized representative of the Employer.

10. Severability

10.1. If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect.

11. Waiver

11.1. The failure of the Employer to enforce any provision of these Terms shall not be deemed a waiver of that provision, nor shall it affect the right of the Employer to enforce that provision at a later time.

12. Acknowledgment

12.1. The Employee hereby acknowledges that they have read, understood, and agree to be bound by these Terms in their entirety. The Employee further acknowledges that they have had the opportunity to review these Terms with legal counsel of their choosing and that they are entering into these Terms freely and voluntarily.

12.2. The Employee agrees to comply with all applicable laws, regulations, and Company policies during the Vacation Period and at all times while employed by the Company.

12.3. The Employee agrees to return to work promptly at the end of the approved Vacation Period and to fulfill all duties and responsibilities assigned to them upon their return.

12.4. The Employee agrees to maintain the confidentiality of any proprietary or confidential information of the Company, both during and after the Vacation Period, in accordance with the Company's confidentiality policies.

12.5. The Employee agrees to refrain from engaging in any activity during the Vacation Period that could potentially harm the reputation or interests of the Company.

13. Miscellaneous

13.1. The headings used in these Terms are for convenience only and shall not affect the interpretation or construction of these Terms.

13.2. Any notices or communications required or permitted to be given under these Terms shall be in writing and shall be deemed to have been duly given when delivered personally, sent by registered or certified mail, return receipt requested, or sent by email with confirmation of receipt, to the addresses set forth in the Company's records.

13.3. The Employee agrees that the Company may, in its sole discretion, assign or transfer these Terms, in whole or in part, to any successor in interest or to any affiliated entity, without the Employee's consent.

13.4. The Employee agrees that the Company may, in its sole discretion, modify or revoke any vacation benefits or policies at any time, with or without notice, subject to applicable law.

13.5. The Employee agrees that the Company shall not be liable for any damages, including but not limited to, indirect, incidental, special, consequential, or punitive damages, or loss of profits or revenues, whether incurred directly or indirectly, or any damages whatsoever arising out of the Employee's use of vacation time, even if the Company has been advised of the possibility of such damages.

13.6. The Employee agrees that the Company shall not be liable for any failure or delay in performing its obligations under these Terms, if such failure or delay is due to circumstances beyond the Company's reasonable control, including but not limited to, acts of God, natural disasters, war, terrorism, labor disputes, or governmental actions.

13.7. The Employee agrees that the Company shall not be liable for any loss or damage arising from the Employee's inability to submit a Request due to technical difficulties or other issues related to the submission process, unless such loss or damage is directly caused by the gross negligence or willful misconduct of the Company.

13.8. The Employee agrees that the Company shall not be liable for any loss or damage arising from the Employee's reliance on any information or advice provided by the Company in connection with the submission of a Request, unless such loss or damage is directly caused by the gross negligence or willful misconduct of the Company.

13.9. The Employee agrees that the Company shall not be liable for any loss or damage arising from the Employee's failure to comply with the terms and conditions of these Terms, including but not limited to, the failure to submit the Request in a timely manner or to provide accurate and complete information.

13.10. The Employee agrees that the Company shall not be liable for any loss or damage arising from the Employee's failure to return to work promptly at the end of the approved Vacation Period, including but not limited to, any loss of pay, benefits, or employment opportunities.

13.11. The Employee agrees that the Company shall not be liable for any loss or damage arising from the Employee's failure to maintain adequate health insurance coverage during the Vacation Period, or from any medical expenses incurred during the Vacation Period.

13.12. The Employee agrees that the Company shall not be liable for any loss or damage arising from the Employee's failure to obtain any necessary visas, permits, or other documentation required for travel during the Vacation Period.

13.13. The Employee agrees that the Company shall not be liable for any loss or damage arising from the Employee's failure to comply with the laws and regulations of the jurisdiction in which they are traveling during the Vacation Period.

13.14. The Employee agrees that the Company shall not be liable for any loss or damage arising from the Employee's failure to notify the Company of any changes to their contact information or travel plans during the Vacation Period.

13.15. The Employee agrees that the Company shall not be liable for any loss or damage arising from the Employee's failure to inform the Company of any medical conditions or other circumstances that may affect their ability to work upon their return from the Vacation Period.

13.16. The Employee agrees that the Company shall not be liable for any loss or damage arising from the Employee's failure to make arrangements for the care of any dependents or pets during the Vacation Period.

13.17. The Employee agrees that the Company shall not be liable for any loss or damage arising from the Employee's failure to secure their workplace or personal belongings during the Vacation Period.

13.18. The Employee agrees that the Company shall not be liable for any loss or damage arising from the Employee's failure to adhere to the Company's code of conduct or other policies during the Vacation Period.

13.19. The Employee agrees that the Company shall not be liable for any loss or damage arising from the Employee's failure to obtain the necessary approvals or clearances from any governmental authorities or other third parties in connection with the Vacation Period.

13.20. The Employee agrees that the Company shall not be liable for any loss or damage arising from the Employee's failure to comply with any applicable export control or sanctions laws during the Vacation Period.

14. Final Provisions

14.1. The Employee acknowledges that they have read, understood, and agree to be bound by these Terms in their entirety, without reservation or exception.

14.2. The Employee acknowledges that they have had the opportunity to seek legal advice before agreeing to these Terms and that they are entering into these Terms freely and voluntarily.

14.3. The Employee acknowledges that they are not relying on any representations or statements made by the Company or its representatives that are not expressly set forth in these Terms.

14.4. The Employee acknowledges that they are fully cognizant of the implications of these Terms and that they are aware of the consequences of failing to comply with any of the terms and conditions set forth herein.

14.5. The Employee agrees to sign and return a copy of these Terms to the Company as evidence of their acceptance and agreement to be bound by these Terms.

14.6. The Employee agrees that the Company may, in its sole discretion, terminate these Terms at any time, with or without cause, by providing written notice to the Employee.

14.7. The Employee agrees that the Company may, in its sole discretion, suspend or restrict the Employee's access to any Company systems or resources during the Vacation Period, for any reason, including but not limited to, security concerns or operational needs.

14.8. The Employee agrees that the Company may, in its sole discretion, require the Employee to undergo a fitness-for-duty evaluation upon their return from the Vacation Period, at the Company's expense, to ensure that they are able to perform their duties safely and effectively.

14.9. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written report or debriefing upon their return from the Vacation Period, detailing their activities and any insights or information gained during the Vacation Period that may be of value to the Company.

14.10. The Employee agrees that the Company may, in its sole discretion, use any information or materials obtained during the Vacation Period for any lawful purpose, including but not limited to, improving Company operations, developing new products or services, or enhancing employee training and development programs.

14.11. The Employee agrees that the Company may, in its sole discretion, share any information or materials obtained during the Vacation Period with third parties, including but not limited to, clients, partners, or regulatory authorities, as required by law or as deemed necessary by the Company in its sole discretion.

14.12. The Employee agrees that the Company may, in its sole discretion, require the Employee to attend additional training or seminars upon their return from the Vacation Period, to ensure that they are up-to-date on any changes or developments in their field of expertise.

14.13. The Employee agrees that the Company may, in its sole discretion, require the Employee to participate in a mentoring or knowledge-sharing program upon their return from the Vacation Period, to share their experiences and insights with other employees of the Company.

14.14. The Employee agrees that the Company may, in its sole discretion, require the Employee to refrain from engaging in any activities during the Vacation Period that could potentially create a conflict of interest or otherwise harm the interests of the Company.

14.15. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide proof of travel, such as receipts or photographs, upon their return from the Vacation Period, to verify the accuracy of the information provided in the Request.

14.16. The Employee agrees that the Company may, in its sole discretion, require the Employee to submit a written statement or affidavit upon their return from the Vacation Period, confirming that they complied with all applicable laws and Company policies during the Vacation Period.

14.17. The Employee agrees that the Company may, in its sole discretion, require the Employee to undergo a background check or other investigation upon their return from the Vacation Period, to ensure that they did not engage in any activities that could potentially harm the interests of the Company.

14.18. The Employee agrees that the Company may, in its sole discretion, require the Employee to submit to a polygraph test or other form of verification upon their return from the Vacation Period, to confirm the truthfulness of any statements made in connection with the Request.

14.19. The Employee agrees that the Company may, in its sole discretion, require the Employee to submit to a mental health evaluation upon their return from the Vacation Period, to assess their fitness for duty and ensure that they are capable of performing their job responsibilities effectively.

14.20. The Employee agrees that the Company may, in its sole discretion, require the Employee to participate in a debriefing session with senior management upon their return from the Vacation Period, to discuss any issues or concerns that arose during the Vacation Period and to provide feedback on the Company's vacation policies.

14.21. The Employee agrees that the Company may, in its sole discretion, require the Employee to submit to a drug test upon their return from the Vacation Period, to ensure that they are not under the influence of any controlled substances that could impair their ability to perform their job duties.

14.22. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of their activities during the Vacation Period, including any contacts with clients, partners, or other third parties, to ensure that they did not engage in any activities that could potentially harm the interests of the Company.

14.23. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any new business opportunities or potential clients identified during the Vacation Period, to ensure that the Company is aware of any potential business developments that may impact its operations.

14.24. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any new skills or knowledge acquired during the Vacation Period, to assess whether any additional training or development is needed to support the Employee's continued growth within the Company.

14.25. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any feedback or suggestions received from clients, partners, or other third parties during the Vacation Period, to inform the Company's strategic planning and decision-making processes.

14.26. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any safety or security concerns encountered during the Vacation Period, to ensure that the Company is aware of any potential risks or vulnerabilities that may impact its operations.

14.27. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any environmental or sustainability initiatives observed or participated in during the Vacation Period, to support the Company's commitment to environmental stewardship and corporate social responsibility.

14.28. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any community service or volunteer activities engaged in during the Vacation Period, to support the Company's commitment to corporate social responsibility and community engagement.

14.29. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any cultural or diversity-related experiences gained during the Vacation Period, to support the Company's commitment to diversity, equity, and inclusion in the workplace.

14.30. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any legal or regulatory issues encountered during the Vacation Period, to ensure that the Company is aware of any potential compliance risks or challenges that may impact its operations.

14.31. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any technological innovations or advancements observed during the Vacation Period, to support the Company's commitment to innovation and technological excellence.

14.32. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any financial or economic trends observed during the Vacation Period, to inform the Company's financial planning and investment decisions.

14.33. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any political or regulatory developments encountered during the Vacation Period, to ensure that the Company is aware of any potential changes in the legal or regulatory environment that may impact its operations.

14.34. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any environmental or sustainability-related issues encountered during the Vacation Period, to support the Company's commitment to environmental stewardship and corporate social responsibility.

14.35. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any health or safety concerns encountered during the Vacation Period, to ensure that the Company is aware of any potential risks or hazards that may impact its operations.

14.36. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any customer feedback or satisfaction levels observed during the Vacation Period, to inform the Company's customer service and satisfaction strategies.

14.37. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any new market opportunities or trends identified during the Vacation Period, to support the Company's growth and expansion initiatives.

14.38. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any new product or service ideas generated during the Vacation Period, to support the Company's innovation and product development efforts.

14.39. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any supply chain or logistics challenges encountered during the Vacation Period, to inform the Company's supply chain management and optimization strategies.

14.40. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any human resources or employee relations issues encountered during the Vacation Period, to support the Company's commitment to a positive and productive work environment.

14.41. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any IT or cybersecurity issues encountered during the Vacation Period, to ensure that the Company is aware of any potential risks or vulnerabilities that may impact its IT infrastructure.

14.42. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any legal or compliance-related issues encountered during the Vacation Period, to ensure that the Company is aware of any potential legal risks or challenges that may impact its operations.

14.43. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any environmental or sustainability-related issues encountered during the Vacation Period, to support the Company's commitment to environmental stewardship and corporate social responsibility.

14.44. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any financial or economic trends observed during the Vacation Period, to inform the Company's financial planning and investment decisions.

14.45. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any political or regulatory developments encountered during the Vacation Period, to ensure that the Company is aware of any potential changes in the legal or regulatory environment that may impact its operations.

14.46. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any environmental or sustainability-related issues encountered during the Vacation Period, to support the Company's commitment to environmental stewardship and corporate social responsibility.

14.47. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any health or safety concerns encountered during the Vacation Period, to ensure that the Company is aware of any potential risks or hazards that may impact its operations.

14.48. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any customer feedback or satisfaction levels observed during the Vacation Period, to inform the Company's customer service and satisfaction strategies.

14.49. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any new market opportunities or trends identified during the Vacation Period, to support the Company's growth and expansion initiatives.

14.50. The Employee agrees that the Company may, in its sole discretion, require the Employee to provide a written summary of any new product or service ideas generated during the Vacation Period, to support the Company's innovation and product development efforts.

15. Conclusion

15.1. The Employee acknowledges that these Terms are a critical component of the Company's vacation request process and that compliance with these Terms is essential to maintaining the Company's operational efficiency, productivity, and competitiveness.

15.2. The Employee agrees to adhere to these Terms in their entirety and to cooperate fully with the Company in the administration and enforcement of these Terms.

15.3. The Employee understands that failure to comply with these Terms may result in disciplinary action, up to and including termination of employment, and may also result in legal action against the Employee, at the Company's sole discretion.

15.4. The Employee agrees that these Terms are binding and enforceable against them and that they have no defenses or objections to the enforceability of these Terms.

15.5. The Employee agrees that these Terms constitute the entire agreement between the Employee and the Company with respect to the submission of a vacation request and that no other agreements, representations, or understandings, whether oral or written, shall be of any force or effect.

15.6. The Employee agrees that these Terms shall be interpreted in accordance with the laws of the jurisdiction in which the Employee is employed, without regard to its conflict of laws principles.

15.7. The Employee agrees that any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of the aforementioned jurisdiction.

15.8. The Employee agrees that these Terms shall be deemed to have been accepted by the Employee upon submission of the Request and that the Employee's continued employment with the Company following the Effective Date shall constitute further evidence of their acceptance and agreement to be bound by these Terms.

15.9. The Employee agrees that these Terms shall remain in effect for the duration of the Employee's employment with the Company and that they shall be subject to any amendments or modifications made by the Company in accordance with the terms set forth herein.

15.10. The Employee agrees that these Terms shall survive the termination of the Employee's employment with the Company for any reason, to the extent necessary to give effect to the provisions hereof.

16. Signatures

16.1. By submitting the Request, the Employee acknowledges that they have read, understood, and agree to be bound by these Terms in their entirety.

16.2. The Employee further acknowledges that they have had the opportunity to review these Terms with legal counsel of their choosing and that they are entering into these Terms freely and voluntarily.

16.3. The Employee agrees to sign and return a copy of these Terms to the Company as evidence of their acceptance and agreement to be bound by these Terms.

17. Appendix

17.1. Attached hereto and incorporated herein by reference is a copy of the Company's vacation policy, which is incorporated into these Terms by this reference.

17.2. The Employee acknowledges that they have read, understood, and agree to comply with the Company's vacation policy in its entirety, as set forth in the附录.

17.3. In the event of any conflict between the terms of these Terms and the terms of the Company's vacation policy, the terms of these Terms shall prevail.

18. Final Note

18.1. The Employee is strongly encouraged to review these Terms carefully and to seek legal advice if they have any questions or concerns regarding the terms and conditions set forth herein.

18.2. The Employee is reminded that these Terms are designed to protect the interests of the Company and to ensure the efficient and effective operation of its business, and that compliance with these Terms is essential to maintaining a positive and productive work environment.

18.3. The Employee is further reminded that the Company is committed to fairness, transparency, and employee well-being, and that these Terms are intended to support those principles while also safeguarding the Company's operational needs and business objectives.

18.4. The Employee is urged to consider these Terms thoughtfully and to approach the submission of a vacation request with a sense of responsibility and professionalism, in keeping with the high standards expected of all Company employees.

19. Additional Provisions

19.1. The Employee agrees to any additional provisions that may be added to these Terms by the Company in the future, provided that such provisions are communicated to the Employee in writing and acknowledged by the Employee in a manner satisfactory to the Company.

19.2. The Employee agrees that the Company may, in its sole discretion, require the Employee to sign an updated version of these Terms at any time, to reflect changes in Company policy, applicable law, or other relevant factors.

19.3. The Employee agrees that failure to sign an updated version of these Terms when required by the Company may result in the denial of the Employee's Request or other disciplinary action, at the Company's sole discretion.

19.4. The Employee agrees that these Terms shall be interpreted in a manner consistent with the Company's overall mission, values, and business objectives, and that the Employee shall act in good faith to support the Company's efforts to achieve its strategic goals.

19.5. The Employee agrees that these Terms shall be deemed to have been accepted by the Employee upon submission of the Request and that the Employee's continued employment with the Company following the Effective Date shall constitute further evidence of their acceptance and agreement to be bound by these Terms.

19.6. The Employee agrees that these Terms shall be deemed to have been accepted by the Employee upon submission of the Request and that the Employee's continued employment with the Company following the Effective Date shall constitute further evidence of their acceptance and agreement to be bound by these Terms.

19.7. The Employee agrees that these Terms shall be deemed to have been accepted by the Employee upon submission of the Request and that the Employee's continued employment with the Company following the Effective Date shall constitute further evidence of their acceptance and agreement to be bound by these Terms.

19.8. The Employee agrees that these Terms shall be deemed to have been accepted by the Employee upon submission of the Request and that the Employee's continued employment with the Company following the Effective Date shall constitute further evidence of their acceptance and agreement to be bound by these Terms.

19.9. The Employee agrees that these Terms shall be deemed to have been accepted by the Employee upon submission of the Request and that the Employee's continued employment with the Company following the Effective Date shall constitute further evidence of their acceptance and agreement to be bound by these Terms.

19.10. The Employee agrees that these Terms shall be deemed to have been accepted by the Employee upon submission of the Request and that the Employee's continued employment with the Company following the Effective Date shall constitute further evidence of their acceptance and agreement to be bound by these Terms.

20. Closing Statement

20.1. The Employee acknowledges that they have read, understood, and agree to be bound by these Terms in their entirety, without reservation or exception.

20.2. The Employee further acknowledges that they have had the opportunity to review these Terms with legal counsel of their choosing and that they are entering into these Terms freely and voluntarily.

20.3. The Employee agrees to sign and return a copy of these Terms to the Company as evidence of their acceptance and agreement to be bound by these Terms.

20.4. The Employee understands that failure to comply with these Terms may result in disciplinary action, up to and including termination of employment, and may also result in legal action against the Employee, at the Company's sole discretion.

20.5. The Employee agrees that these Terms are binding and enforceable against them and that they have no defenses or objections to the enforceability of these Terms.

20.6. The Employee agrees that these Terms constitute the entire agreement between the Employee and the Company with respect to the submission of a vacation request and that no other agreements, representations, or understandings, whether oral or written, shall be of any force or effect.

20.7. The Employee agrees that these Terms shall be interpreted in accordance with the laws of the jurisdiction in which the Employee is employed, without regard to its conflict of laws principles.

20.8. The Employee agrees that any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of the aforementioned jurisdiction.

20.9. The Employee agrees that these Terms shall be deemed to have been accepted by the Employee upon submission of the Request and that the Employee's continued employment with the Company following the Effective Date shall constitute further evidence of their acceptance and agreement to be bound by these Terms.

20.10. The Employee agrees that these Terms shall remain in effect for the duration of the Employee's employment with the Company and that they shall be subject to any amendments or modifications made by the Company in accordance with the terms set forth herein.

20.11. The Employee agrees that these Terms shall survive the termination of the Employee's employment with the Company for any reason, to the extent necessary to give effect to the provisions hereof.

20.12. The Employee agrees that these Terms shall be deemed to have been accepted by the Employee upon submission of the Request and that the Employee's continued employment with the Company following the Effective Date shall constitute further evidence of their acceptance and agreement to be bound by these Terms.

20.13. The Employee agrees that these Terms shall be deemed to have been accepted by the Employee upon submission of the Request and that the Employee's continued employment with the Company following the Effective Date shall constitute further evidence of their acceptance and agreement to be bound by these Terms.

20.14. The Employee agrees that these Terms shall be deemed to have been accepted by the Employee upon submission of the Request and that the Employee's continued employment with the Company following the Effective Date shall constitute further evidence of their acceptance and agreement to be bound by these Terms.

20.15. The Employee agrees that these Terms shall be deemed to have been accepted by the Employee upon submission of the Request and that the Employee's continued employment with the Company following the Effective Date shall constitute further evidence of their acceptance and agreement to be bound by these Terms.

20.16. The Employee agrees that these Terms shall be deemed to have been accepted by the Employee upon submission of the Request and that the Employee's continued employment with the Company following the Effective Date shall constitute further evidence of their acceptance and agreement to be bound by these Terms.

20.17. The Employee agrees that these Terms shall be deemed to have been accepted by the Employee upon submission of the Request and that the Employee's continued employment with the Company following the Effective Date shall constitute further evidence of their acceptance and agreement to be bound by these Terms.

20.18. The Employee agrees that these Terms shall be deemed to have been accepted by the Employee upon submission of the Request and that the Employee's continued employment with the Company following the Effective Date shall constitute further evidence of their acceptance and agreement to be bound by these Terms.

20.19. The Employee agrees that these Terms shall be deemed to have been accepted by the Employee upon submission of the Request and that the Employee's continued employment with the Company following the Effective Date shall constitute further evidence of their acceptance and agreement to be bound by these Terms.

20.20. The Employee agrees that these Terms shall be deemed to have been accepted by the Employee upon submission of the Request and that the Employee's continued employment with the Company following the Effective Date shall constitute further evidence of their acceptance and agreement to be bound by these Terms.

End of Terms and Conditions
`

// const text = "I have read and agreed to the terms of services";
// const text = `
// 1. Introduction
//
// These Terms and Conditions (hereinafter referred to as the "Terms") govern the submission of a vacation request (hereinafter referred to as the "Request") by an employee (hereinafter referred to as the "Employee") to their employer (hereinafter referred to as the "Employer" or "Company"). The Employee acknowledges and agrees that by submitting a Request, they are bound by these Terms in their entirety, without reservation or exception. The Employee further acknowledges that they have read, understood, and agree to be bound by these Terms, including any amendments thereto, which may be made by the Company at any time, in its sole and absolute discretion.
//
// 2. Definitions
//
// 2.1. "Business Day" means any day other than a Saturday, Sunday, or a day on which the Company is closed for business, as determined by the Company in its sole discretion.
//
// 2.2. "Effective Date" means the date on which the Request is approved by the Employer, as communicated to the Employee in writing.
//
// 2.3. "Vacation Period" means the continuous period of time during which the Employee is authorized to be absent from work, as specified in the approved Request.
//
// 2.4. "Workload Assessment" means the evaluation conducted by the Employer to determine the impact of the Employee's absence on the Company's operations during the Vacation Period.
//
// 2.5. "Substitute Arrangement" means any temporary replacement or delegation of responsibilities assigned to the Employee during the Vacation Period, as determined by the Employer.
// `
interface AudioTranscriptionResponse {
  text: string;
}

const LevelSeven = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcription, setTranscription] = useState<string>('');
  const [score, setScore] = useState<number|undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await transcribeAudio(audioBlob);

        // Stop all audio tracks
        mediaRecorderRef.current?.stream.getTracks().forEach(track => track.stop());
      };
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.wav');
    formData.append("language", "en")
    formData.append('model', 'whisper-1');

    setIsLoading(true);

    try {
      // locally hosted server so this is fine.
      const response = await fetch(`${process.env.NEXT_PUBLIC_OPENAI_URL}/v1/audio/transcriptions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data: AudioTranscriptionResponse = await response.json();
      setTranscription(data.text);
      setScore(1 - (distance(text, data.text) / Math.max(data.text.length, text.length)))
    } catch (error) {
      console.error('Error transcribing audio:', error);
      setTranscription('Error transcribing audio');
    } finally {
      setIsLoading(false);
    }
  };

  const submit = () => {
    if ((score ?? 0) < 80) return;
    if (!confirm("Are your REALLY REALLY sure you want to do this? This action can be reversed.")) {
      setScore(0)
      setTranscription("")
      return;
    }
    alert("Congrats! You won")
  }

  return (
    <div className="p-8 flex flex-col text-white noselect">
      <h1 className="text-3xl font-bold">Terms & Condition</h1>
      <p>If you would like to take a vacation break, please ensure you have read this carefully!</p>

      <p className="text-red-500 bg-red-600">
        {text}
      </p>
      <div className="my-4 space-y-4">
        <p>To agree to the terms of conditions please turn on your microphone and read it out loud.</p>
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={isRecording ? 'recording bg-red-500' : 'bg-blue-500'}
        >
          {isRecording ? 'Stop Reciting' : 'Start Reciting'}
        </button>


        {transcription && (
          <div className="bg-gray-900 p-10">
            <h3>Transcription:</h3>
            <p>{transcription}</p>
          </div>
        )}
        {(score ?? 0) < 80 ? <p>Are you sure you read it through properly? Our systems says NO!</p>: <p>Great Job! Don&#39;t forget to come back for work.</p>}
        <button onClick={submit} className={(score ?? 0) >= 80 ? "block": "bg-gray-500 block cursor-not-allowed"}>Submit</button>
      </div>

      {isLoading && (
        <div className="mx-6">
          Transcribing audio...
        </div>
      )}


      <style jsx>{`
          .controls {
              margin: 20px 0;
          }

          button {
              padding: 10px 20px;
              font-size: 16px;
              color: white;
              border: none;
              border-radius: 4px;
          }

          button.recording {
              background-color: #dc3545;
          }
          
          .noselect {
              -webkit-touch-callout: none; /* iOS Safari */
              -webkit-user-select: none; /* Safari */
              -moz-user-select: none; /* Old versions of Firefox */
              -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none;
          }
      `}</style>
    </div>
  );
};

export default LevelSeven;