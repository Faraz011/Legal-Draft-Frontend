import React, { useCallback } from "react";
import { Info } from "lucide-react";
import NumberField from "../../../../FormComponents/NumberField";
import TextAreaField from "../../../../FormComponents/TextAreaField";

const AgriClause16Section = ({ formType, formData, handleChange }) => {
  const generateClause16Preview = useCallback(() => {
    const installments = formData.terminationInstallments || "___";
    const remedyDays = formData.defaultRemedyDays || "___";

    return `The Lessor may terminate this lease in case of: (a) Non-payment of rent for ${installments} successive installments, provided a notice of ${remedyDays} days has been served; (b) Use of land for non-agricultural purposes; (c) Subleasing without permission; or (d) Land damage or other violation of the lease terms.`;
  }, [formData.terminationInstallments, formData.defaultRemedyDays]);

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
        <h4 className="text-sm font-semibold text-red-400 mb-4 uppercase tracking-wider">
          Termination Conditions
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumberField
            label="Successive Unpaid Installments for Termination"
            name="terminationInstallments"
            value={formData.terminationInstallments}
            onChange={handleChange("terminationInstallments")}
            min={1}
            max={12}
            helperText="Number of missed payments before Lessor can terminate"
          />
          <NumberField
            label="Notice Remedy Period (Days)"
            name="defaultRemedyDays"
            value={formData.defaultRemedyDays}
            onChange={handleChange("defaultRemedyDays")}
            min={7}
            max={90}
            helperText="Days given to Lessee to fix a breach"
          />
        </div>

        <div className="mt-4">
          <TextAreaField
            label="Lessee's Termination Rights"
            name="lesseeTerminationReason"
            value={formData.lesseeTerminationReason}
            onChange={handleChange("lesseeTerminationReason")}
            placeholder="e.g. Failure of Lessor to provide peaceful possession or title disputes..."
            helperText="Specify under what conditions the Lessee can terminate"
          />
        </div>

        {/* Live Clause Preview */}
        <div className="mt-6 p-4 bg-slate-900 rounded-lg border-l-4 border-red-500">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-red-400" />
            <span className="text-xs font-bold text-slate-400 uppercase">
              Clause 16.3 Preview
            </span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed italic">
            "{generateClause16Preview()}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgriClause16Section;
