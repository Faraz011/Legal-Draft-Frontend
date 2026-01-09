import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import TextAreaField from "../../../../FormComponents/TextAreaField";

const DynamicRightToMortgageSection = ({ formData, handleChange }) => {
  const [expandedClause, setExpandedClause] = useState(false);

  const generateClause19 = (model) => {
    const mortgageTerms = {
      free_mortgage: `The Lessor shall have the absolute right to mortgage, pledge, or hypothecate the demised premises and all fixtures attached thereto as collateral to any financial institution or lender without any restriction or requirement of consent from the Lessee. Such mortgage shall be subordinate to the rights of the Lessee under this Lease Deed.`,

      no_mortgage: `The Lessor shall NOT have the right to mortgage or pledge the demised premises during the lease period. Any attempt to mortgage without the Lessee's written consent shall be grounds for lease termination by the Lessee, and the Lessee may seek damages.`,

      with_consent: `The Lessor may mortgage or pledge the demised premises only with prior written consent of the Lessee. The Lessee's consent shall not be unreasonably withheld. Any mortgage created by the Lessor shall not affect the Lessee's rights under this Lease Deed.`,

      lessee_notification: `The Lessor shall have the right to mortgage the premises but must provide written notice to the Lessee within 15 days of creating the mortgage. The mortgagee shall acknowledge the Lessee's occupation rights and the continuity of this Lease Deed.`,

      subordination: `In case the Lessor mortgages the property, the mortgagee shall execute a subordination agreement confirming that this Lease Deed takes priority over the mortgage. The mortgagee shall not have the right to evict the Lessee on account of the Lessor's default in mortgage payments.`,

      custom: formData.customMortgageClause || `Custom mortgage terms to be agreed upon by both parties.`,
    };

    return mortgageTerms[model] || mortgageTerms.free_mortgage;
  };

  const handleClauseChange = (e) => {
    const value = e.target?.value || e;
    const generatedClause = generateClause19(value);
    handleChange("mortgageClause19")(generatedClause);
  };

  return (
    <div className="space-y-4 bg-slate-800 rounded-lg p-4 border border-slate-700">
      <h4 className="text-white font-semibold mb-4">
        Right to Mortgage 
      </h4>

      {/* Mortgage Model Selection */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Mortgage Rights Model
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            { value: "free_mortgage", label: "Lessor Can Mortgage Freely" },
            { value: "no_mortgage", label: "Lessor Cannot Mortgage" },
            {
              value: "with_consent",
              label: "Only with Lessee Consent",
            },
            {
              value: "lessee_notification",
              label: "With Lessee Notification",
            },
            { value: "subordination", label: "Subordination Required" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={(e) => {
                e.preventDefault();
                handleClauseChange({ target: { value: option.value } });
                setExpandedClause(true);
              }}
              className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                formData.mortgageClause19?.includes(
                  generateClause19(option.value).substring(0, 20)
                )
                  ? "bg-indigo-500 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Generated Clause Preview */}
      {formData.mortgageClause19 && (
        <div className="bg-slate-900 p-3 rounded border border-slate-600">
          <button
            onClick={() => setExpandedClause(!expandedClause)}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="text-sm font-semibold text-white">
              Clause 19 (Generated)
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform ${
                expandedClause ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedClause && (
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {formData.mortgageClause19}
            </p>
          )}
        </div>
      )}

      {/* Custom Terms */}
      <div className="pt-4 border-t border-slate-700">
        <TextAreaField
          label="Custom Mortgage Terms (Optional)"
          name="customMortgageClause"
          placeholder="Enter custom mortgage rights terms"
          value={formData.customMortgageClause || ""}
          onChange={(e) =>
            handleChange("customMortgageClause")(e.target.value)
          }
          maxLength={500}
        />
      </div>
    </div>
  );
};

export default DynamicRightToMortgageSection;