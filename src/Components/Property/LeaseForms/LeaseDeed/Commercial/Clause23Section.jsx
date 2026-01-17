import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { 
  FileText,
  Info,
  CheckCircle,
  AlertTriangle,
  Users
} from "lucide-react";
import NumberField from "../../../../FormComponents/NumberField";
import TextAreaField from "../../../../FormComponents/TextAreaField";
import CheckboxField from "../../../../FormComponents/CheckboxField";
import SelectField from "../../../../FormComponents/SelectField";
import {
  selectFormData,
  updateField,
  updateFormBulk
} from "../../../../../redux/PropertySlices/leaseSlice";

const DynamicAssignmentByLessorSection = () => {
  const dispatch = useDispatch();
  const formType = "deed";
  const formData = useSelector((state) => selectFormData(formType)(state));
  
  const handleChange = (field) => (e) => {
    const value = e.target?.value !== undefined ? e.target.value : e;
    dispatch(updateField({ formType, field, value }));
  };
  
  const showLesseeConsent = formData.assignmentClauseType === "lessee_consent";
  const showNotification = formData.assignmentClauseType === "with_notification";
  const showRestrictions = formData.enableAssignmentRestrictions;
  const showCustomClause = formData.assignmentClauseType === "custom";
  const showAssigneeObligation = formData.enableAssigneeObligation;

  const generateClause23Preview = useCallback(() => {
    let baseText = "";
    
    switch (formData.assignmentClauseType) {
      case "unrestricted":
        baseText += "The Lessor shall have the right to sell, assign, convey, or transfer his interest in the Leased Premises or his rights and obligations under this Lease Deed to any third party without obtaining the written consent of the Lessee, provided that he ensures the prospective purchaser/assignee agrees to be bound by the terms of this Lease Deed.";
        break;
      
      case "lessee_consent":
        baseText += "Any sale, assignment, conveyance, or transfer of the Lessor's interest in the Leased Premises or his rights and obligations under this Lease Deed shall require the prior written consent of the Lessee, which shall not be unreasonably withheld or delayed.";
        
        if (formData.lesseeLossOfRights) {
          baseText += " However, if the Lessee unreasonably refuses consent, the Lessor may proceed with the assignment, and the Lessee shall retain all rights under this Lease Deed.";
        }
        break;
      
      case "with_notification":
        const notifyDays = formData.notificationDays || "30";
        baseText += `The Lessor shall have the right to sell, assign, convey, or transfer his interest in the Leased Premises or his rights and obligations under this Lease Deed to any third party. However, the Lessor must provide written notification to the Lessee within ${notifyDays} days of the assignment, clearly identifying the new assignee and confirming that the assignee agrees to be bound by the terms of this Lease Deed.`;
        break;
      
      case "limited_assignment":
        baseText += "The Lessor may assign this Lease Deed to: (a) Financial institutions or lenders in case of mortgage or refinancing; (b) Property management companies; (c) Related entities or affiliated companies. Any assignment outside these categories requires the Lessee's written consent. The Lessor must notify the Lessee in writing within 15 days of any permitted assignment.";
        break;
      
      case "custom":
        baseText += formData.customAssignmentClause 
          ? formData.customAssignmentClause 
          : "[Your custom assignment clause will appear here]";
        break;
      
      default:
        baseText += "[Select assignment type]";
    }

    if (formData.enableAssignmentRestrictions && formData.assignmentClauseType !== "limited_assignment") {
      let restrictionText = "";
      
      switch (formData.restrictionType) {
        case "financial_status":
          restrictionText = " The assignee must demonstrate financial creditworthiness equivalent to or better than the original Lessee.";
          break;
        
        case "business_type":
          restrictionText = " The assignee's business activities must be compatible with the nature and purpose of the Leased Premises.";
          break;
        
        case "no_illegal":
          restrictionText = " The assignee must certify that they will not engage in any illegal activities on the Leased Premises.";
          break;
        
        case "compliance":
          restrictionText = " The assignee must agree to comply with all applicable laws, regulations, and bylaws related to the use of the Leased Premises.";
          break;
        
        case "custom":
          restrictionText = formData.customRestrictions ? ` ${formData.customRestrictions}` : "";
          break;
        default:
          restrictionText = "";
      }
      
      baseText += restrictionText;
    }

    if (formData.enableAssigneeObligation) {
      const obligations = formData.assigneeObligations || [];
      if (obligations.length > 0) {
        baseText += " The assignee shall be bound by the following obligations: " + obligations.join("; ") + ".";
      }
    }

    if (formData.postAssignmentLessorLiability) {
      switch (formData.postAssignmentLessorLiability) {
        case "no_liability":
          baseText += " Upon assignment, the original Lessor shall be released from all liabilities and obligations under this Lease Deed.";
          break;
        
        case "joint_liability":
          baseText += " Upon assignment, the original Lessor shall remain jointly liable with the assignee for all obligations under this Lease Deed until the lease expiry or early termination.";
          break;
        
        case "limited_liability":
          baseText += " The original Lessor shall remain liable for the obligations of the new lessor for a period of 12 months from the date of assignment or until the expiry of the lease, whichever is earlier.";
          break;
        default:
          break;
      }
    }

    return baseText;
  }, [
    formData.assignmentClauseType,
    formData.lesseeLossOfRights,
    formData.notificationDays,
    formData.enableAssignmentRestrictions,
    formData.restrictionType,
    formData.customRestrictions,
    formData.customAssignmentClause,
    formData.enableAssigneeObligation,
    formData.assigneeObligations,
    formData.postAssignmentLessorLiability
  ]);

  useEffect(() => {
    const clause23 = generateClause23Preview();
    
    dispatch(updateFormBulk({ formType, data: { assignmentClause23: clause23, clause23 } }));
  }, [
    generateClause23Preview,
    dispatch,
    formType
  ]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 bg-opacity-10">
          <FileText className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Assignment by Lessor Configuration</h2>
          <p className="text-sm text-slate-400 mt-1">Customize rights to assign/sell property (Clause 23)</p>
        </div>
      </div>

      <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg flex items-start gap-3">
        <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-purple-200">
          <p className="font-semibold mb-1">Assignment Rights</p>
          <p>Define whether and how the lessor can sell or assign property rights. This affects lessee stability and protects lessor's investment liquidity.</p>
        </div>
      </div>

      <div className="space-y-4 mb-6 p-5 bg-slate-800/50 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></span>
          Assignment Type (Clause 23)
        </h3>

        <SelectField
          label="Assignment Rights Type"
          name="assignmentClauseType"
          value={formData.assignmentClauseType}
          onChange={handleChange("assignmentClauseType")}
          required
          options={[
            { value: "unrestricted", label: "Unrestricted Assignment (Lessor-Friendly)" },
            { value: "lessee_consent", label: "Requires Lessee Consent (Tenant-Friendly)" },
            { value: "with_notification", label: "Assignment with Notification (Balanced)" },
            { value: "limited_assignment", label: "Limited Assignment (Specific Categories)" },
            { value: "custom", label: "Custom Assignment Clause" },
          ]}
          helperText="Define whether lessor needs lessee approval to assign property"
        />

        {showLesseeConsent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pl-4 border-l-2 border-purple-500/30"
          >
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div>
                <label className="text-white text-sm font-medium">Lessee Retains Rights if Consent Unreasonably Refused?</label>
                <p className="text-xs text-slate-400 mt-1">Protects lessee if consent is withheld arbitrarily</p>
              </div>
              <CheckboxField
                label=""
                name="lesseeLossOfRights"
                checked={formData.lesseeLossOfRights}
                onChange={(e) => handleChange("lesseeLossOfRights")({ target: { value: e.target.checked }})}
              />
            </div>
          </motion.div>
        )}

        {showNotification && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pl-4 border-l-2 border-purple-500/30"
          >
            <NumberField
              label="Notification Period (Days)"
              name="notificationDays"
              value={formData.notificationDays}
              onChange={handleChange("notificationDays")}
              min={7}
              max={90}
              required
              helperText="Days within which lessor must notify lessee of assignment"
            />
          </motion.div>
        )}

        {showCustomClause && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pl-4 border-l-2 border-purple-500/30"
          >
            <TextAreaField
              label="Custom Assignment Clause"
              name="customAssignmentClause"
              value={formData.customAssignmentClause}
              onChange={handleChange("customAssignmentClause")}
              placeholder="Write your custom assignment clause here..."
              minLength={50}
              maxLength={1000}
              required
              helperText="Define exact conditions and restrictions for assignment"
            />
          </motion.div>
        )}
      </div>

      <div className="space-y-4 mb-6 p-5 bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></span>
              Assignment Restrictions (Optional)
            </h3>
            <p className="text-sm text-slate-400 mt-1">Add restrictions on who can become assignee</p>
          </div>
          <CheckboxField
            label=""
            name="enableAssignmentRestrictions"
            checked={formData.enableAssignmentRestrictions}
            onChange={(e) => handleChange("enableAssignmentRestrictions")({ target: { value: e.target.checked }})}
          />
        </div>

        <AnimatePresence>
          {showRestrictions && formData.assignmentClauseType !== "limited_assignment" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <SelectField
                label="Type of Restriction"
                name="restrictionType"
                value={formData.restrictionType}
                onChange={handleChange("restrictionType")}
                required
                options={[
                  { value: "financial_status", label: "Financial Creditworthiness" },
                  { value: "business_type", label: "Business Type Compatibility" },
                  { value: "no_illegal", label: "No Illegal Activities Certification" },
                  { value: "compliance", label: "Legal Compliance Agreement" },
                  { value: "custom", label: "Custom Restrictions" },
                ]}
                helperText="Define what assignee must satisfy"
              />

              {formData.restrictionType === "custom" && (
                <TextAreaField
                  label="Custom Restrictions"
                  name="customRestrictions"
                  value={formData.customRestrictions}
                  onChange={handleChange("customRestrictions")}
                  placeholder="Describe specific restrictions on assignee..."
                  minLength={30}
                  maxLength={500}
                  required
                  helperText="Define exact requirements for new assignee"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-4 mb-6 p-5 bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"></span>
              Assignee Obligations (Optional)
            </h3>
            <p className="text-sm text-slate-400 mt-1">Duties the new lessor must undertake</p>
          </div>
          <CheckboxField
            label=""
            name="enableAssigneeObligation"
            checked={formData.enableAssigneeObligation}
            onChange={(e) => handleChange("enableAssigneeObligation")({ target: { value: e.target.checked }})}
          />
        </div>

        <AnimatePresence>
          {showAssigneeObligation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-4 border-l-2 border-amber-500/30"
            >
              <div className="space-y-3">
                <label className="text-slate-200 text-sm font-medium mb-2 block">Select Assignee Obligations:</label>
                <div className="space-y-2 pl-1">
                  {[
                    "Assume all obligations of original lessor",
                    "Indemnify original lessor from future claims",
                    "Maintain property insurance at current levels",
                    "Comply with all municipal regulations",
                    "Respect existing tenant agreements",
                    "Maintain maintenance standards",
                    "Provide security deposit protection guarantee"
                  ].map((obligation, idx) => (
                    <div key={idx} className="obligation-item flex items-start">
                      <CheckboxField
                        label={obligation}
                        name={`obligation_${idx}`}
                        className="mb-0"
                        checked={(formData.assigneeObligations || []).includes(obligation)}
                        onChange={(e) => {
                          const current = formData.assigneeObligations || [];
                          const updated = e.target.checked
                            ? [...current, obligation]
                            : current.filter(i => i !== obligation);
                          handleChange("assigneeObligations")({ target: { value: updated }});
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-4 mb-6 p-5 bg-slate-800/50 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-rose-500"></span>
          Post-Assignment Lessor Liability
        </h3>

        <SelectField
          label="Original Lessor's Liability After Assignment"
          name="postAssignmentLessorLiability"
          value={formData.postAssignmentLessorLiability}
          onChange={handleChange("postAssignmentLessorLiability")}
          required
          options={[
            { value: "no_liability", label: "No Liability (Complete Release)" },
            { value: "joint_liability", label: "Joint Liability (Throughout Lease Term)" },
            { value: "limited_liability", label: "Limited Liability (12 Months Only)" },
          ]}
          helperText="Define whether original lessor remains responsible after assignment"
        />

        <div className="p-4 bg-slate-700/30 rounded-lg text-sm text-slate-300">
          <p className="flex items-start gap-2">
            <Users className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>
              {formData.postAssignmentLessorLiability === "no_liability" && "Original lessor completely released from all obligations."}
              {formData.postAssignmentLessorLiability === "joint_liability" && "Original lessor remains jointly liable with new assignee until lease ends."}
              {formData.postAssignmentLessorLiability === "limited_liability" && "Original lessor liable for 12 months or until lease expiry."}
              {!formData.postAssignmentLessorLiability && "Select an option to see liability details."}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-6 p-5 bg-slate-950/50 border border-slate-700 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <h4 className="text-white font-semibold">Live Preview</h4>
        </div>
        
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
          <p className="text-xs text-slate-400 mb-2 font-mono">CLAUSE 23 - ASSIGNMENT BY LESSOR</p>
          <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
            {generateClause23Preview()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DynamicAssignmentByLessorSection;
