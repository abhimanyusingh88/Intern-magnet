export const missingPrompt = ({ skills, userSkills }: { skills: string[], userSkills: string[] }) => `
                     Required Skills: ${JSON.stringify(skills)}
                    User Skills: ${JSON.stringify(userSkills)}
                    Find which skills from Required Skills are NOT present in User Skills.
                    Return STRICT JSON in this format only:
                  {
                       "missingSkills": ["skill1", "skill2", "skill3"],
                         "improvementPlan": "A short overall description of what the user should do to gain these skills and please state is saying to user , its must be like \"you should do this and that\""
                    }
                   Do not return anything else.
                     `;