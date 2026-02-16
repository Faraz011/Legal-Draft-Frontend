import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Users,
  Calendar,
  DollarSign,
  MapPin,
  ClipboardList,
  Eye,
  Shield,
  Lock,
  Wrench,
  Scale,
  AlertCircle,
  Copy,
  Wheat,
  Droplets,
  Sprout,
  Hammer,
  User,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import TextInputField from "../../../../FormComponents/TextInputField";
import NumberField from "../../../../FormComponents/NumberField";
import DateField from "../../../../FormComponents/DateField";
import TextAreaField from "../../../../FormComponents/TextAreaField";
import SelectField from "../../../../FormComponents/SelectField";
import CheckboxField from "../../../../FormComponents/CheckboxField";
import LeasePreview from "../../../../FormComponents/LeasePreview";
import {
  selectFormData,
  updateField,
  initializeForm,
  updateFormBulk,
} from "../../../../../redux/PropertySlices/leaseSlice";
import AutoFillButton from "../../../../FormComponents/AutoFillButton";

// Dynamic Clause Sections
import AgriClause5Section from "./AgriClause5Section";
import AgriClause16Section from "./AgriClause16Section";

// Default form data for Agricultural Lease
const defaultFormData = {
  // 1. Agreement Details
  agreementPlace: "",
  agreementDate: "",

  // 2. Lessor Details
  lessorName: "",
  lessorAge: "",
  lessorFatherName: "",
  lessorResidentAddress: "",
  lessorAadharNo: "",
  lessorPanCardNo: "",

  // 3. Lessee Details
  lesseeName: "",
  lesseeAge: "",
  lesseeFatherName: "",
  lesseeResidentAddress: "",
  lesseeAadharNo: "",
  lesseePanCardNo: "",
  lesseeEngagement: "agriculture/farming",

  // 4. Property Details (Recitals)
  propertyVillage: "",
  propertyTehsil: "",
  propertyDistrict: "",
  propertyName: "",
  propertyPinCode: "",
  propertySurveyNo: "",
  propertyKhatauniNo: "",
  propertyAcres: "",
  propertyBighas: "",
  propertyBiswa: "",
  propertyDhur: "",

  // Property Limits
  limitNorth: "",
  limitSouth: "",
  limitEast: "",
  limitWest: "",

  // Title Details
  acquisitionType: "Sale Deed",
  acquisitionNo: "",
  acquisitionDate: "",
  acquisitionOffice: "",

  // 5. Purpose
  agriculturalUses: "General cultivation and farming",

  // 6. Term
  leaseStartDate: "",
  leaseEndDate: "",
  leaseTermYears: "1",
  cropCycleFrom: "June",
  cropCycleTo: "March",
  renewalNoticeMonths: "3",

  // 7. Rent
  annualRentPerAcre: "",
  totalAnnualRent: "",
  rentPaymentDay: "10",
  rentPaymentMonth: "January",
  paymentMethod: "Bank Transfer",
  paymentMethodType: "fixed", // fixed, share_cropping, crop_based
  shareCroppingPercent: "",
  cropPaymentQuintals: "",
  cropPaymentCrop: "",
  latePaymentInterestRate: "12",
  rentRevisionPercent: "5",
  rentRevisionYears: "3",

  // 8. Security Deposit
  securityDepositAmount: "",

  // 9. Water
  waterRights: [],
  irrigationConsentRequired: true,
  waterChargesBorneBy: "lessee",

  // 10. Inputs
  seedsProvidedBy: "lessee",
  machineryProvidedBy: "lessee",
  fertilizersProvidedBy: "lessee",

  // 11. Termination
  terminationInstallments: "2",
  defaultRemedyDays: "30",
  lesseeTerminationReason: "",

  // 12. Legal
  registrationBorneBy: "Both",
  courtJurisdiction: "",
  governingState: "",
  attestationAuthority: "Notary",

  // 13. Witnesses
  witness1Name: "",
  witness1Address: "",
  witness2Name: "",
  witness2Address: "",

  // Special Conditions
  specialCondition1: "",
  specialCondition2: "",
};

const demoAgriData = {
  agreementPlace: "Nagpur",
  agreementDate: "2024-06-01",
  lessorName: "Ramesh Patil",
  lessorAge: "55",
  lessorFatherName: "Late Vithal Patil",
  lessorResidentAddress: "Patil Niwas, Civil Lines, Nagpur, Maharashtra",
  lessorAadharNo: "4455-6677-8899",
  lessorPanCardNo: "ABCMP1234F",
  lesseeName: "Suresh Deshmukh",
  lesseeAge: "42",
  lesseeFatherName: "Ganpat Deshmukh",
  lesseeResidentAddress: "Village Wardha, Maharashtra",
  lesseeAadharNo: "1122-3344-5566",
  lesseePanCardNo: "XYZDP5678K",
  lesseeEngagement: "Experienced Farmer",
  propertyVillage: "Kalmeshwar",
  propertyTehsil: "Nagpur Rural",
  propertyDistrict: "Nagpur",
  propertyName: "Maharashtra",
  propertyPinCode: "441501",
  propertySurveyNo: "124/2",
  propertyKhatauniNo: "88",
  propertyAcres: "5",
  limitNorth: "Survey No 123",
  limitSouth: "Main Road",
  limitEast: "Canal",
  limitWest: "Forest Land",
  acquisitionType: "Inheritance",
  acquisitionNo: "MUT/2010/45",
  acquisitionDate: "2010-05-20",
  acquisitionOffice: "Tehsildar Kalmeshwar",
  agriculturalUses: "Organic Cotton and Soybean cultivation",
  leaseStartDate: "2024-07-01",
  leaseEndDate: "2029-06-30",
  leaseTermYears: "5",
  annualRentPerAcre: "15000",
  totalAnnualRent: "75000",
  securityDepositAmount: "30000",
  governingState: "Maharashtra",
  courtJurisdiction: "Nagpur",
  witness1Name: "Vinod Ghate",
  witness1Address: "Kalmeshwar Market, Nagpur",
  witness2Name: "Deepak Tighare",
  witness2Address: "Civil Lines, Nagpur",
};

const AgriLeasedeedForm = () => {
  const dispatch = useDispatch();
  const formType = "agricultural";
  const formData =
    useSelector((state) => selectFormData(formType)(state)) || defaultFormData;
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    dispatch(initializeForm({ formType, initialData: defaultFormData }));
  }, [dispatch, formType]);

  const handleChange = (field) => (e) => {
    const value = e && e.target ? e.target.value : e;
    dispatch(updateField({ formType, field, value }));
  };

  const handleFill = () => {
    dispatch(updateFormBulk({ formType, data: demoAgriData }));
  };

  if (previewMode) {
    return (
      <LeasePreview formType={formType} onEdit={() => setPreviewMode(false)} />
    );
  }

  const sections = [
    {
      icon: FileText,
      title: "Agreement Details",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Parties",
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      icon: MapPin,
      title: "Property",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Sprout,
      title: "Purpose & Term",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: DollarSign,
      title: "Rent & Payments",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: AlertCircle,
      title: "Termination",
      gradient: "from-red-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-black py-12 px-4 pt-32 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full mb-6">
            <Wheat className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-400 text-sm">
              Agricultural Lease Deed
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Agricultural Lease Deed
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Draft a professional lease agreement for agricultural land with
            dynamic cropping patterns and water rights.
          </p>

          {/* Progress Indicator */}
          <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
            {sections.map((section, idx) => (
              <div
                key={idx}
                className={`h-1.5 w-8 rounded-full bg-gradient-to-r ${section.gradient} opacity-30`}
              />
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <AutoFillButton onFill={handleFill} />
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={(e) => {
            e.preventDefault();
            setPreviewMode(true);
          }}
          className="space-y-12"
        >
          {/* 1. Agreement Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 bg-opacity-10">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Agreement Details
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInputField
                label="Place of Execution"
                value={formData.agreementPlace}
                onChange={handleChange("agreementPlace")}
                required
              />
              <DateField
                label="Date of Execution"
                value={formData.agreementDate}
                onChange={handleChange("agreementDate")}
                required
              />
            </div>
          </div>

          {/* 2. Lessor Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 bg-opacity-10">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Lessor Details (The Owner)
              </h2>
            </div>
            <div className="space-y-4">
              <TextInputField
                label="Full Name"
                value={formData.lessorName}
                onChange={handleChange("lessorName")}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NumberField
                  label="Age"
                  value={formData.lessorAge}
                  onChange={handleChange("lessorAge")}
                  required
                />
                <TextInputField
                  label="S/o, D/o, W/o"
                  value={formData.lessorFatherName}
                  onChange={handleChange("lessorFatherName")}
                  required
                />
              </div>
              <TextAreaField
                label="Complete Residential Address"
                value={formData.lessorResidentAddress}
                onChange={handleChange("lessorResidentAddress")}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInputField
                  label="Aadhaar Number"
                  value={formData.lessorAadharNo}
                  onChange={handleChange("lessorAadharNo")}
                  required
                />
                <TextInputField
                  label="PAN Number"
                  value={formData.lessorPanCardNo}
                  onChange={handleChange("lessorPanCardNo")}
                  required
                />
              </div>
            </div>
          </div>

          {/* 3. Lessee Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 bg-opacity-10">
                <User className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Lessee Details (The Farmer)
              </h2>
            </div>
            <div className="space-y-4">
              <TextInputField
                label="Full Name"
                value={formData.lesseeName}
                onChange={handleChange("lesseeName")}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NumberField
                  label="Age"
                  value={formData.lesseeAge}
                  onChange={handleChange("lesseeAge")}
                  required
                />
                <TextInputField
                  label="S/o, D/o, W/o"
                  value={formData.lesseeFatherName}
                  onChange={handleChange("lesseeFatherName")}
                  required
                />
              </div>
              <TextAreaField
                label="Complete Residential Address"
                value={formData.lesseeResidentAddress}
                onChange={handleChange("lesseeResidentAddress")}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInputField
                  label="Aadhaar Number"
                  value={formData.lesseeAadharNo}
                  onChange={handleChange("lesseeAadharNo")}
                  required
                />
                <TextInputField
                  label="PAN Number"
                  value={formData.lesseePanCardNo}
                  onChange={handleChange("lesseePanCardNo")}
                  required
                />
              </div>
              <TextInputField
                label="Current Engagement"
                value={formData.lesseeEngagement}
                onChange={handleChange("lesseeEngagement")}
                placeholder="e.g. Agriculture/Farming"
              />
            </div>
          </div>

          {/* 4. Property Description */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 bg-opacity-10">
                <MapPin className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Property Description
              </h2>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextInputField
                  label="Village"
                  value={formData.propertyVillage}
                  onChange={handleChange("propertyVillage")}
                  required
                />
                <TextInputField
                  label="Tehsil"
                  value={formData.propertyTehsil}
                  onChange={handleChange("propertyTehsil")}
                  required
                />
                <TextInputField
                  label="District"
                  value={formData.propertyDistrict}
                  onChange={handleChange("propertyDistrict")}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInputField
                  label="Survey / Khasra No."
                  value={formData.propertySurveyNo}
                  onChange={handleChange("propertySurveyNo")}
                  required
                />
                <TextInputField
                  label="Khatauni No."
                  value={formData.propertyKhatauniNo}
                  onChange={handleChange("propertyKhatauniNo")}
                  required
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-800/20 p-4 rounded-xl">
                <NumberField
                  label="Acres"
                  value={formData.propertyAcres}
                  onChange={handleChange("propertyAcres")}
                />
                <NumberField
                  label="Bighas"
                  value={formData.propertyBighas}
                  onChange={handleChange("propertyBighas")}
                />
                <NumberField
                  label="Biswa"
                  value={formData.propertyBiswa}
                  onChange={handleChange("propertyBiswa")}
                />
                <NumberField
                  label="Dhur"
                  value={formData.propertyDhur}
                  onChange={handleChange("propertyDhur")}
                />
              </div>
              <div className="border-t border-slate-800 pt-6">
                <h4 className="text-slate-400 text-sm mb-4 uppercase">
                  Boundaries (Limits)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInputField
                    label="North"
                    value={formData.limitNorth}
                    onChange={handleChange("limitNorth")}
                  />
                  <TextInputField
                    label="South"
                    value={formData.limitSouth}
                    onChange={handleChange("limitSouth")}
                  />
                  <TextInputField
                    label="East"
                    value={formData.limitEast}
                    onChange={handleChange("limitEast")}
                  />
                  <TextInputField
                    label="West"
                    value={formData.limitWest}
                    onChange={handleChange("limitWest")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 5. Purpose & Term */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 bg-opacity-10">
                <Sprout className="w-6 h-6 text-orange-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Lease Purpose & Term
              </h2>
            </div>
            <div className="space-y-6">
              <TextAreaField
                label="Agricultural Uses"
                value={formData.agriculturalUses}
                onChange={handleChange("agriculturalUses")}
                required
                helperText="e.g. Cultivation of wheat, soybean"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DateField
                  label="Commencement Date"
                  value={formData.leaseStartDate}
                  onChange={handleChange("leaseStartDate")}
                  required
                />
                <DateField
                  label="Termination Date"
                  value={formData.leaseEndDate}
                  onChange={handleChange("leaseEndDate")}
                  required
                />
                <NumberField
                  label="Term (Years)"
                  value={formData.leaseTermYears}
                  onChange={handleChange("leaseTermYears")}
                  required
                />
              </div>
            </div>
          </div>

          {/* 6. Rent & Payments */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 bg-opacity-10">
                <DollarSign className="w-6 h-6 text-pink-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Rent & Payment Terms
              </h2>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NumberField
                  label="Annual Rent per Acre (Rs)"
                  value={formData.annualRentPerAcre}
                  onChange={handleChange("annualRentPerAcre")}
                  required
                />
                <NumberField
                  label="Total Annual Rent (Rs)"
                  value={formData.totalAnnualRent}
                  onChange={handleChange("totalAnnualRent")}
                  required
                />
              </div>
              <AgriClause5Section
                formType={formType}
                formData={formData}
                handleChange={handleChange}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-800 pt-6">
                <NumberField
                  label="Late Fee (%)"
                  value={formData.latePaymentInterestRate}
                  onChange={handleChange("latePaymentInterestRate")}
                />
                <NumberField
                  label="Revision (%)"
                  value={formData.rentRevisionPercent}
                  onChange={handleChange("rentRevisionPercent")}
                />
                <NumberField
                  label="Every (Years)"
                  value={formData.rentRevisionYears}
                  onChange={handleChange("rentRevisionYears")}
                />
              </div>
            </div>
          </div>

          {/* 7. Water & Irrigation */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 bg-opacity-10">
                <Droplets className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Water & Irrigation
              </h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CheckboxField
                  label="Wells/Bore-wells usage access"
                  checked={formData.waterRights?.includes("wells")}
                  onChange={(val) => {
                    const rights = formData.waterRights || [];
                    handleChange("waterRights")(
                      val
                        ? [...rights, "wells"]
                        : rights.filter((r) => r !== "wells"),
                    );
                  }}
                />
                <CheckboxField
                  label="Canal connections access"
                  checked={formData.waterRights?.includes("canal")}
                  onChange={(val) => {
                    const rights = formData.waterRights || [];
                    handleChange("waterRights")(
                      val
                        ? [...rights, "canal"]
                        : rights.filter((r) => r !== "canal"),
                    );
                  }}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CheckboxField
                  label="Prior consent for new equipment"
                  checked={formData.irrigationConsentRequired}
                  onChange={handleChange("irrigationConsentRequired")}
                />
                <SelectField
                  label="Charges Borne By"
                  value={formData.waterChargesBorneBy}
                  onChange={handleChange("waterChargesBorneBy")}
                  options={[
                    { label: "Lessee", value: "lessee" },
                    { label: "Lessor", value: "lessor" },
                    { label: "Shared", value: "shared" },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* 8. Default & Termination */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 bg-opacity-10">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Default & Termination
              </h2>
            </div>
            <AgriClause16Section
              formType={formType}
              formData={formData}
              handleChange={handleChange}
            />
          </div>

          {/* 9. Legal & Witness */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 bg-opacity-10">
                <Scale className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Legal & Authentication
              </h2>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInputField
                  label="Governing State"
                  value={formData.governingState}
                  onChange={handleChange("governingState")}
                  required
                />
                <TextInputField
                  label="Court Jurisdiction"
                  value={formData.courtJurisdiction}
                  onChange={handleChange("courtJurisdiction")}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-800 pt-6">
                <div className="space-y-4">
                  <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                    Witness 1
                  </h4>
                  <TextInputField
                    label="Full Name"
                    value={formData.witness1Name}
                    onChange={handleChange("witness1Name")}
                  />
                  <TextAreaField
                    label="Address"
                    value={formData.witness1Address}
                    onChange={handleChange("witness1Address")}
                  />
                </div>
                <div className="space-y-4">
                  <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                    Witness 2
                  </h4>
                  <TextInputField
                    label="Full Name"
                    value={formData.witness2Name}
                    onChange={handleChange("witness2Name")}
                  />
                  <TextAreaField
                    label="Address"
                    value={formData.witness2Address}
                    onChange={handleChange("witness2Address")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submission */}
          <div className="flex justify-center pt-8 pb-20">
            <button
              type="submit"
              className="px-12 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl shadow-2xl shadow-emerald-500/20 hover:scale-105 transition-all flex items-center gap-3 text-lg"
            >
              Preview Document
              <Eye className="w-6 h-6" />
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default AgriLeasedeedForm;
