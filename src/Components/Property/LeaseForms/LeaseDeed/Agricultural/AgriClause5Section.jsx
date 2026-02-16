import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import SelectField from "../../../../FormComponents/SelectField";
import NumberField from "../../../../FormComponents/NumberField";
import TextInputField from "../../../../FormComponents/TextInputField";

const AgriClause5Section = ({ formType, formData, handleChange }) => {
  const generateClause53Preview = useCallback(() => {
    if (formData.paymentMethodType === "fixed") {
      return "The Lessee shall pay the fixed annual lease rent as specified in Clause 5.1.";
    }

    if (formData.paymentMethodType === "share_cropping") {
      const percent = formData.shareCroppingPercent || "___";
      return `The Lessee shall pay the rent via Share Cropping, where ${percent}% of the total produce from the Leased Land shall be delivered to the Lessor as lease rent.`;
    }

    if (formData.paymentMethodType === "crop_based") {
      const quintals = formData.cropPaymentQuintals || "___";
      const crop = formData.cropPaymentCrop || "__________";
      return `The Lessee shall pay the rent via Crop-based Payment, delivering ${quintals} quintals of ${crop} crop per acre to the Lessor as lease rent.`;
    }

    return "[Select alternative payment method details]";
  }, [
    formData.paymentMethodType,
    formData.shareCroppingPercent,
    formData.cropPaymentQuintals,
    formData.cropPaymentCrop,
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
        <h4 className="text-sm font-semibold text-emerald-400 mb-4 uppercase tracking-wider">
          Rent Payment Configuration
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Rent Payment Type"
            name="paymentMethodType"
            value={formData.paymentMethodType || "fixed"}
            onChange={handleChange("paymentMethodType")}
            options={[
              { value: "fixed", label: "Fixed Cash Rent Only" },
              { value: "share_cropping", label: "Share Cropping" },
              { value: "crop_based", label: "Crop-based Payment" },
            ]}
          />

          {formData.paymentMethodType === "share_cropping" && (
            <NumberField
              label="Lessor's Share Percentage (%)"
              name="shareCroppingPercent"
              value={formData.shareCroppingPercent}
              onChange={handleChange("shareCroppingPercent")}
              placeholder="e.g. 25"
            />
          )}

          {formData.paymentMethodType === "crop_based" && (
            <div className="grid grid-cols-2 gap-2">
              <NumberField
                label="Quintals per Acre"
                name="cropPaymentQuintals"
                value={formData.cropPaymentQuintals}
                onChange={handleChange("cropPaymentQuintals")}
              />
              <TextInputField
                label="Crop Name"
                name="cropPaymentCrop"
                value={formData.cropPaymentCrop}
                onChange={handleChange("cropPaymentCrop")}
                placeholder="e.g. Wheat"
              />
            </div>
          )}
        </div>

        {/* Live Clause Preview */}
        <div className="mt-6 p-4 bg-slate-900 rounded-lg border-l-4 border-emerald-500">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-slate-400 uppercase">
              Clause 5.3 Preview
            </span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed italic">
            "{generateClause53Preview()}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgriClause5Section;
