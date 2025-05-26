import { AlertCircle } from "lucide-react";
import Card from "../../common/custom-card";
import { RHFCheckBox } from "../../common/rhf-checkbox";
import { RHFRadioGroup } from "../../common/rhf-grouped-radio";
import { RHFInputField } from "../../common/rhf-input";
import { RHFTextArea } from "../../common/rhf-text-area";
import { areasOfExperties, radioOptions, skillCategories } from "../data";
import { useEI } from "../EIContext";

export default function SkillsResearch({ onNext, onPrev }) {
  const {
    hasValidDepartment,
    anyResearchProjects,
    anyArticles,
    submitErrorMessage,
  } = useEI();

  return (
    <Card title="Skills, Expertise & Research">
      {submitErrorMessage && (
        <div className="flex items-start gap-3 p-4 bg-red-100 border-l-4 border-red-500 rounded-lg text-red-600 my-10">
          <AlertCircle className="mt-1 w-5 h-5 text-red-600" />
          <div>
            <p className="font-semibold">Missing Required Information</p>
            {submitErrorMessage}
          </div>
        </div>
      )}
      <div
        className="flex flex-col p-4 my-4 text-blue-600 border border-blue-300 rounded-lg bg-blue-100 "
        role="alert"
      >
        <div className="flex items-center text-[15]" role="alert">
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div className="font-medium">
            <span>Info!</span> This section helps in identifying employees
            across different countries for incubating projects based on their
            skills & expertise.
          </div>
        </div>
      </div>
      {!hasValidDepartment && (
        <p className="text-red-600 my-2 bg-red-100 inline-block p-2 rounded w-full">
          Please ensure at least one core area of expertise is checked before
          proceeding
        </p>
      )}
      <div className="my-10">
        <p className="font-semibold mb-4">
          A. Core Areas of Expertise (Tick all that apply)
        </p>
        <div className="ml-6">
          {areasOfExperties?.map((item) => (
            <RHFCheckBox
              key={item.id}
              name={`department${item.id}`}
              label={item.label}
            />
          ))}
          <div className="w-1/2 mt-4">
            <RHFInputField
              outerLabel="Other (Specify if not listed above)"
              name="otherArea"
              placeholder="Enter Other (Specify if not listed above)"
            />
          </div>
        </div>
      </div>
      <div className="my-10">
        <p className="font-semibold mb-4">B. Technical & Soft Skills</p>
        <div
          className="flex flex-col p-4 my-4 text-blue-600 border border-blue-300 rounded-lg bg-blue-100 "
          role="alert"
        >
          <div className="flex items-center text-[15]" role="alert">
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div className="font-medium">
              <span>Info!</span> Rate your proficiency in the following skills
              (1 = Beginner, 5 = Expert)
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-3 mb-4">
            <p className="font-semibold">Skill Category</p>
            <p className="font-semibold">Specific Skill</p>
            <p className="font-semibold">Rating (1-5)</p>
          </div>
          {skillCategories.map((category) => (
            <div key={category.category} className="grid grid-cols-3 mb-6">
              <div>
                <p>{category.category}</p>
              </div>
              <div className="flex flex-col gap-2">
                {category.skills.map((skill) => (
                  <p key={skill.value}>{skill.name}</p>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {category.skills.map((skill) => (
                  <div key={skill.value}>
                    <RHFRadioGroup
                      options={radioOptions}
                      name={`skills.${skill.value}`} // Unique name for each skill
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full">
          <RHFTextArea
            name="additionalSkills"
            placeholder="Additional Skills"
            outerLabel="Additional Skills"
          />
        </div>
      </div>
      <div className="my-10">
        <p className="font-semibold mb-4">C. Research Background</p>
        <div className="flex flex-col gap-4 px-1 pr-4">
          <div className="flex flex-row xs:flex-col gap-6">
            <div className="w-full">
              <RHFRadioGroup
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ]}
                name="anyResearchProjects"
                outerLabel="Have you been involved in any research projects?"
                required
              />
            </div>
            <div className="w-full">
              <RHFRadioGroup
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ]}
                name="anyArticles"
                outerLabel="Have you published any papers, reports, or articles?"
                required
              />
            </div>
          </div>
          <div className="flex flex-row xs:flex-col gap-6">
            <div className="w-full">
              {anyResearchProjects === "yes" && (
                <RHFTextArea
                  name="researchAreas"
                  placeholder="If yes, specify topics/research areas"
                  outerLabel="If yes, specify topics/research areas"
                  required
                />
              )}
            </div>

            <div className="w-full">
              {anyArticles === "yes" && (
                <RHFTextArea
                  name="links"
                  placeholder="If yes, provide details or links"
                  outerLabel="If yes, provide details or links"
                  required
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="ei-nav">
        <button
          type="button"
          onClick={onPrev}
          className="px-4 py-2 text-sm text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none font-medium flex items-center gap-2"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => onNext()}
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none font-medium flex items-center gap-2"
        >
          Next
        </button>
      </div>
    </Card>
  );
}
