import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Building2,
  Users,
  Calendar,
  DollarSign,
  MapPin,
  Eye,
  Shield,
  Lock,
  Scale,
  AlertCircle,
  Copy,
  Factory,
  Zap,
  CheckCircle2,
  Home,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import TextInputField from "../../../../FormComponents/TextInputField";
import NumberField from "../../../../FormComponents/NumberField";
import DateField from "../../../../FormComponents/DateField";
import TextAreaField from "../../../../FormComponents/TextAreaField";
import SelectField from "../../../../FormComponents/SelectField";
import LeasePreview from "../../../../FormComponents/LeasePreview";
import DynamicDefaultClauseSection from "../Commercial/Clause42Section";
import DynamicRightToMortgageSection from "./Clause19Section";
import DynamicCounterpartsSection from "./Clause24Section";
import {
  selectFormData,
  selectFormState,
  updateField,
  initializeForm,
} from "../../../../../redux/PropertySlices/leaseSlice";


const IndustrialLeaseDeedForm = () => {
  const dispatch = useDispatch();
  const formType = "industrial_deed";

  // Default form data - 37 fields total
  const defaultFormData = {
    // Agreement Details (2 fields)
    agreementPlace: "",
    agreementDate: "",

    // Lessor Details (5 fields)
    lessorName: "",
    lessorFatherName: "",
    lessorResidentAddress: "",
    lessorAadharNo: "",
    lessorPanCardNo: "",

    // Lessee Details (5 fields)
    lesseeName: "",
    lesseeFatherName: "",
    lesseeResidentAddress: "",
    lesseeAadharNo: "",
    lesseePanCardNo: "",

    // Property & Purpose (2 fields)
    propertySituatedAt: "",
    propertyMunicipalNo: "",

    // Industrial Operations (2 fields)
    industrialPurpose: "",
    machineryEquipmentDescription: "",

    // Rent & Payment (6 fields)
    rentAmount: "",
    rentPaymentMode: "bank_transfer",
    latePaymentInterestRate: "2.5",
    defaultRemedyDays: "",
    annualRentIncreasePercent: "5",
    rentIncreaseNoticeDays: "90",

    // Dynamic Clauses (4 fields - CORRECTED: removed clause72, clause73)
    clause43: "",
    clause44: "",
    mortgageClause19: "",
    counterpartClause24: "",

    // Lease Term (2 fields)
    leaseStartDate: "",
    leaseEndDate: "",

    // Security Deposit (1 field - STATIC, NOT DYNAMIC)
    securityDepositAmount: "",

    // Lock-in Period (2 fields)
    lockInDurationYears: "1",
    lockInStartDate: "",

    // Infrastructure (4 fields)
    powerSupplyCapacity: "",
    waterConsumptionLimit: "",
    wasteManagementResponsibility: "",
    inspectionNoticeHours: "48",

    // Compliance & Safety (4 fields)
    fireAffiliateCompliance: "",
    laborLawsCompliance: "",
    environmentalCompliance: "",
    pollutionControlApproval: "",

    // Legal Terms (4 fields)
    governingLawState: "",
    courtJurisdiction: "",
    noticeLanguage: "English",
    noticeDeliveryMode: "courier",

    // Schedule I - Property (11 fields)
    buildingNo: "",
    propertyAreaSqMtrs: "",
    registrationDistrict: "",
    subDivisionTaluka: "",
    corporationLimits: "",
    plotNo: "",
    surveyNo: "",
    boundaryEast: "",
    boundarySouth: "",
    boundaryWest: "",
    boundaryNorth: "",

    // Witnesses (4 fields)
    witness1Name: "",
    witness1Address: "",
    witness2Name: "",
    witness2Address: "",
  };

  // Initialize form on mount
  useEffect(() => {
    dispatch(initializeForm({ formType, initialData: defaultFormData }));
  }, [dispatch, formType, defaultFormData]);

  // Get form data and state from Redux
  const formData = useSelector((state) => selectFormData(formType)(state));
  useSelector((state) => selectFormState(formType)(state));

  // Handle field changes with Redux
  const handleChange = (field) => (e) => {
    const value = e.target?.value !== undefined ? e.target.value : e;
    dispatch(updateField({ formType, field, value }));
  };

  const [previewMode, setPreviewMode] = useState(false);

  const handlePreview = (e) => {
    e.preventDefault();
    setPreviewMode(true);
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
      title: "Party Information",
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      icon: Building2,
      title: "Property Details",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Factory,
      title: "Industrial Operations",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: DollarSign,
      title: "Rent & Payments",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: Calendar,
      title: "Lease Term",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Shield,
      title: "Security Deposit",
      gradient: "from-teal-500 to-cyan-500",
    },
    {
      icon: Lock,
      title: "Lock-in Period",
      gradient: "from-violet-500 to-purple-500",
    },
    {
      icon: Zap,
      title: "Infrastructure",
      gradient: "from-yellow-500 to-amber-500",
    },
    {
      icon: AlertCircle,
      title: "Compliance & Safety",
      gradient: "from-red-500 to-pink-500",
    },
    {
      icon: Scale,
      title: "Legal Terms",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      icon: MapPin,
      title: "Schedules",
      gradient: "from-cyan-500 to-blue-500",
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
            <Factory className="w-4 h-4 text-orange-400" />
            <span className="text-slate-400 text-sm">Industrial Property Lease</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Industrial Lease Deed
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Complete all sections to generate a legally compliant industrial lease agreement
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
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handlePreview}
          className="space-y-8"
        >
          {/* 1. Agreement Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 bg-opacity-10">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Agreement Details</h2>
            </div>

            <div className="space-y-4">
              <TextInputField
                label="Place of Agreement"
                name="agreementPlace"
                placeholder="City / Location where deed is made"
                value={formData.agreementPlace}
                onChange={handleChange("agreementPlace")}
                onlyLetters
                required
              />
              <DateField
                label="Agreement Date"
                name="agreementDate"
                value={formData.agreementDate}
                onChange={handleChange("agreementDate")}
                required
              />
            </div>
          </div>

          {/* 2. Party Information */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 bg-opacity-10">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Party Information</h2>
            </div>

            {/* Lessor */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"></span>
                Lessor (Property Owner)
              </h3>
              <div className="space-y-4">
                <TextInputField
                  label="Lessor's Full Name"
                  name="lessorName"
                  placeholder="Shri/Smt..."
                  value={formData.lessorName}
                  onChange={handleChange("lessorName")}
                  onlyLetters
                  required
                />
                <TextInputField
                  label="Father's Name"
                  name="lessorFatherName"
                  placeholder="Son/Daughter of..."
                  value={formData.lessorFatherName}
                  onChange={handleChange("lessorFatherName")}
                  onlyLetters
                  required
                />
                <TextAreaField
                  label="Lessor's Residential Address"
                  name="lessorResidentAddress"
                  placeholder="Complete residential address"
                  value={formData.lessorResidentAddress}
                  onChange={handleChange("lessorResidentAddress")}
                  required
                  minLength={10}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInputField
                    label="Aadhar Number"
                    name="lessorAadharNo"
                    placeholder="XXXX-XXXX-XXXX"
                    value={formData.lessorAadharNo}
                    onChange={handleChange("lessorAadharNo")}
                    maxLength={14}
                    required
                  />
                  <TextInputField
                    label="PAN Card Number"
                    name="lessorPanCardNo"
                    placeholder="ABCDE1234F"
                    value={formData.lessorPanCardNo}
                    onChange={handleChange("lessorPanCardNo")}
                    maxLength={10}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-sm text-slate-500 bg-slate-900">And</span>
              </div>
            </div>

            {/* Lessee */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"></span>
                Lessee (Tenant)
              </h3>
              <div className="space-y-4">
                <TextInputField
                  label="Lessee's Full Name"
                  name="lesseeName"
                  placeholder="Shri/Smt..."
                  value={formData.lesseeName}
                  onChange={handleChange("lesseeName")}
                  onlyLetters
                  required
                />
                <TextInputField
                  label="Father's Name"
                  name="lesseeFatherName"
                  placeholder="Son/Daughter of..."
                  value={formData.lesseeFatherName}
                  onChange={handleChange("lesseeFatherName")}
                  onlyLetters
                  required
                />
                <TextAreaField
                  label="Lessee's Residential Address"
                  name="lesseeResidentAddress"
                  placeholder="Complete residential address"
                  value={formData.lesseeResidentAddress}
                  onChange={handleChange("lesseeResidentAddress")}
                  required
                  minLength={10}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInputField
                    label="Aadhar Number"
                    name="lesseeAadharNo"
                    placeholder="XXXX-XXXX-XXXX"
                    value={formData.lesseeAadharNo}
                    onChange={handleChange("lesseeAadharNo")}
                    maxLength={14}
                    required
                  />
                  <TextInputField
                    label="PAN Card Number"
                    name="lesseePanCardNo"
                    placeholder="ABCDE1234F"
                    value={formData.lesseePanCardNo}
                    onChange={handleChange("lesseePanCardNo")}
                    maxLength={10}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Property Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 bg-opacity-10">
                <Building2 className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Property Details</h2>
            </div>

            <div className="space-y-4">
              <TextInputField
                label="Property Municipal No."
                name="propertyMunicipalNo"
                placeholder="Municipal number or property ID"
                value={formData.propertyMunicipalNo}
                onChange={handleChange("propertyMunicipalNo")}
              />
              <TextAreaField
                label="Property Situated At (Complete Address)"
                name="propertySituatedAt"
                placeholder="Full address including street, area, city, state"
                value={formData.propertySituatedAt}
                onChange={handleChange("propertySituatedAt")}
                required
                minLength={10}
              />
            </div>
          </div>

          {/* 4. Industrial Operations */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 bg-opacity-10">
                <Factory className="w-6 h-6 text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Industrial Operations</h2>
            </div>

            <div className="space-y-4">
              <TextAreaField
                label="Purpose of Industrial Operations"
                name="industrialPurpose"
                placeholder="e.g., Manufacturing of textiles, Food processing, Metal fabrication"
                value={formData.industrialPurpose}
                onChange={handleChange("industrialPurpose")}
                required
                minLength={10}
              />
              <TextAreaField
                label="Machinery & Equipment Description"
                name="machineryEquipmentDescription"
                placeholder="List all machinery (e.g., Power looms x 10, Generators x 2)"
                value={formData.machineryEquipmentDescription}
                onChange={handleChange("machineryEquipmentDescription")}
                minLength={10}
                maxLength={1000}
              />
            </div>
          </div>

          {/* 5. Rent & Payment Terms */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 bg-opacity-10">
                <DollarSign className="w-6 h-6 text-pink-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Rent & Payment Terms</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NumberField
                  label="Monthly Rent Amount (₹)"
                  name="rentAmount"
                  value={formData.rentAmount}
                  onChange={handleChange("rentAmount")}
                  min={1000}
                  currency
                  required
                />
                <SelectField
                  label="Payment Mode"
                  name="rentPaymentMode"
                  value={formData.rentPaymentMode}
                  onChange={handleChange("rentPaymentMode")}
                  required
                  options={[
                    { value: "cheque", label: "Cheque" },
                    { value: "bank_transfer", label: "Bank Transfer" },
                    { value: "cash", label: "Cash" },
                    { value: "online", label: "Online" },
                    { value: "demand_draft", label: "Demand Draft" },
                  ]}
                />
              </div>

              <NumberField
                label="Late Payment Interest Rate (% per month)"
                name="latePaymentInterestRate"
                value={formData.latePaymentInterestRate}
                onChange={handleChange("latePaymentInterestRate")}
                min={0}
                max={20}
                step={0.5}
                required
              />

              <DynamicDefaultClauseSection
                formData={formData}
                handleChange={handleChange}
              />

              <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                <h4 className="text-white font-semibold mb-3">Annual Rent Revision</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <NumberField
                    label="Annual Increase Percentage (%)"
                    name="annualRentIncreasePercent"
                    value={formData.annualRentIncreasePercent}
                    onChange={handleChange("annualRentIncreasePercent")}
                    min={0}
                    max={20}
                    step={0.5}
                    required
                  />
                  <NumberField
                    label="Notice Period for Increase (Days)"
                    name="rentIncreaseNoticeDays"
                    value={formData.rentIncreaseNoticeDays}
                    onChange={handleChange("rentIncreaseNoticeDays")}
                    min={30}
                    max={180}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 6. Lease Term */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 bg-opacity-10">
                <Calendar className="w-6 h-6 text-orange-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Lease Term</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DateField
                  label="Lease Start Date"
                  name="leaseStartDate"
                  value={formData.leaseStartDate}
                  onChange={handleChange("leaseStartDate")}
                  required
                />
                <DateField
                  label="Lease End Date"
                  name="leaseEndDate"
                  value={formData.leaseEndDate}
                  onChange={handleChange("leaseEndDate")}
                  min={formData.leaseStartDate}
                  required
                />
              </div>
            </div>
          </div>

          {/* 7. Security Deposit - STATIC (NOT DYNAMIC) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 bg-opacity-10">
                <Shield className="w-6 h-6 text-teal-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Security Deposit</h2>
            </div>

            <div className="space-y-4">
              <NumberField
                label="Security Deposit Amount (₹)"
                name="securityDepositAmount"
                value={formData.securityDepositAmount}
                onChange={handleChange("securityDepositAmount")}
                min={0}
                currency
                required
                helperText="Refundable, interest-free"
              />
            </div>
          </div>

          {/* 8. Lock-in Period */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 bg-opacity-10">
                <Lock className="w-6 h-6 text-violet-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Lock-in Period</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DateField
                label="Lock-in Period Start Date"
                name="lockInStartDate"
                value={formData.lockInStartDate}
                onChange={handleChange("lockInStartDate")}
                required
              />
              <NumberField
                label="Lock-in Duration (Years)"
                name="lockInDurationYears"
                value={formData.lockInDurationYears}
                onChange={handleChange("lockInDurationYears")}
                min={1}
                max={10}
                required
              />
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Neither party can terminate the lease during the lock-in period
            </p>
          </div>

          {/* 9. Infrastructure */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 bg-opacity-10">
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Infrastructure & Utilities</h2>
            </div>

            <div className="space-y-4">
              <TextInputField
                label="Power Supply Capacity (in kW)"
                name="powerSupplyCapacity"
                placeholder="e.g., 50 kW"
                value={formData.powerSupplyCapacity}
                onChange={handleChange("powerSupplyCapacity")}
              />
              <TextInputField
                label="Water Consumption Limit (in KL/Month)"
                name="waterConsumptionLimit"
                placeholder="e.g., 10 KL"
                value={formData.waterConsumptionLimit}
                onChange={handleChange("waterConsumptionLimit")}
              />
              <SelectField
                label="Waste Management Responsibility"
                name="wasteManagementResponsibility"
                value={formData.wasteManagementResponsibility}
                onChange={handleChange("wasteManagementResponsibility")}
                options={[
                  { value: "lessee", label: "Lessee Responsible" },
                  { value: "lessor", label: "Lessor Responsible" },
                  { value: "shared", label: "Shared Responsibility" },
                ]}
              />
              <TextInputField
                label="Inspection Notice Period (Hours)"
                name="inspectionNoticeHours"
                placeholder="e.g., 48 hours"
                value={formData.inspectionNoticeHours}
                onChange={handleChange("inspectionNoticeHours")}
              />
            </div>
          </div>

          {/* 10. Compliance & Safety */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 bg-opacity-10">
                <CheckCircle2 className="w-6 h-6 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Compliance & Safety</h2>
            </div>

            <div className="space-y-4">
              <SelectField
                label="Fire Safety Compliance"
                name="fireAffiliateCompliance"
                value={formData.fireAffiliateCompliance}
                onChange={handleChange("fireAffiliateCompliance")}
                options={[
                  { value: "yes", label: "Yes - Complied" },
                  { value: "no", label: "No - Not Applicable" },
                  { value: "in_progress", label: "In Progress" },
                ]}
              />
              <SelectField
                label="Labor Laws Compliance"
                name="laborLawsCompliance"
                value={formData.laborLawsCompliance}
                onChange={handleChange("laborLawsCompliance")}
                options={[
                  { value: "yes", label: "Yes - Complied" },
                  { value: "no", label: "No - Not Applicable" },
                  { value: "in_progress", label: "In Progress" },
                ]}
              />
              <SelectField
                label="Environmental Compliance"
                name="environmentalCompliance"
                value={formData.environmentalCompliance}
                onChange={handleChange("environmentalCompliance")}
                options={[
                  { value: "yes", label: "Yes - Complied" },
                  { value: "no", label: "No - Not Applicable" },
                  { value: "in_progress", label: "In Progress" },
                ]}
              />
              <TextInputField
                label="Pollution Control Approval Status"
                name="pollutionControlApproval"
                placeholder="e.g., Approved, Pending, Not Required"
                value={formData.pollutionControlApproval}
                onChange={handleChange("pollutionControlApproval")}
              />
            </div>
          </div>

          {/* 11. Legal Terms */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 bg-opacity-10">
                <Scale className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Legal Terms & Jurisdiction</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInputField
                  label="Governing Law (State)"
                  name="governingLawState"
                  placeholder="e.g., Maharashtra, Karnataka"
                  value={formData.governingLawState}
                  onChange={handleChange("governingLawState")}
                  onlyLetters
                  required
                />
                <TextInputField
                  label="Court Jurisdiction (City)"
                  name="courtJurisdiction"
                  placeholder="e.g., Mumbai, Bangalore"
                  value={formData.courtJurisdiction}
                  onChange={handleChange("courtJurisdiction")}
                  onlyLetters
                  required
                />
              </div>

              <SelectField
                label="Notice Language"
                name="noticeLanguage"
                value={formData.noticeLanguage}
                onChange={handleChange("noticeLanguage")}
                required
                options={[
                  { value: "English", label: "English" },
                  { value: "Hindi", label: "Hindi" },
                  { value: "English and Hindi", label: "English and Hindi" },
                ]}
              />

              <SelectField
                label="Notice Delivery Mode"
                name="noticeDeliveryMode"
                value={formData.noticeDeliveryMode}
                onChange={handleChange("noticeDeliveryMode")}
                required
                options={[
                  { value: "hand_delivery", label: "Hand Delivery" },
                  { value: "courier", label: "Registered Courier" },
                  { value: "email", label: "Email" },
                  { value: "all", label: "All Modes" },
                ]}
              />

              <DynamicRightToMortgageSection
                formData={formData}
                formType={formType}
                handleChange={handleChange}
              />
            </div>
          </div>

          {/* 12. Counterparts */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 bg-opacity-10">
                <Copy className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Counterparts & Execution</h2>
            </div>

            <div className="space-y-4">
              <DynamicCounterpartsSection
                formData={formData}
                formType={formType}
                handleChange={handleChange}
              />
            </div>
          </div>

          {/* 13. Schedule I - Property Description */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 bg-opacity-10">
                <Home className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Schedule I — Property Description
              </h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInputField
                  label="Building No."
                  name="buildingNo"
                  value={formData.buildingNo}
                  onChange={handleChange("buildingNo")}
                  required
                />
                <NumberField
                  label="Property Area (Sq. mtrs.)"
                  name="propertyAreaSqMtrs"
                  value={formData.propertyAreaSqMtrs}
                  onChange={handleChange("propertyAreaSqMtrs")}
                  min={1}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInputField
                  label="Registration District"
                  name="registrationDistrict"
                  placeholder="Registration division and district"
                  value={formData.registrationDistrict}
                  onChange={handleChange("registrationDistrict")}
                  required
                />
                <TextInputField
                  label="Sub-division / Taluka"
                  name="subDivisionTaluka"
                  value={formData.subDivisionTaluka}
                  onChange={handleChange("subDivisionTaluka")}
                />
              </div>

              <TextInputField
                label="Corporation Limits"
                name="corporationLimits"
                placeholder="Within the limits of..."
                value={formData.corporationLimits}
                onChange={handleChange("corporationLimits")}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInputField
                  label="Plot No."
                  name="plotNo"
                  value={formData.plotNo}
                  onChange={handleChange("plotNo")}
                />
                <TextInputField
                  label="Survey No."
                  name="surveyNo"
                  value={formData.surveyNo}
                  onChange={handleChange("surveyNo")}
                />
              </div>

              {/* Boundaries */}
              <div className="mt-6">
                <h3 className="text-white font-semibold mb-4">Property Boundaries</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <TextInputField
                    label="East"
                    name="boundaryEast"
                    placeholder="On or towards East"
                    value={formData.boundaryEast}
                    onChange={handleChange("boundaryEast")}
                  />
                  <TextInputField
                    label="South"
                    name="boundarySouth"
                    placeholder="On or towards South"
                    value={formData.boundarySouth}
                    onChange={handleChange("boundarySouth")}
                  />
                  <TextInputField
                    label="West"
                    name="boundaryWest"
                    placeholder="On or towards West"
                    value={formData.boundaryWest}
                    onChange={handleChange("boundaryWest")}
                  />
                  <TextInputField
                    label="North"
                    name="boundaryNorth"
                    placeholder="On or towards North"
                    value={formData.boundaryNorth}
                    onChange={handleChange("boundaryNorth")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 14. Witnesses */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 bg-opacity-10">
                <Users className="w-6 h-6 text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Witnesses</h2>
            </div>

            <div className="space-y-6">
              {/* Witness 1 */}
              <div>
                <h3 className="text-white font-semibold mb-4">Witness 1</h3>
                <div className="space-y-4">
                  <TextInputField
                    label="Name"
                    name="witness1Name"
                    value={formData.witness1Name}
                    onChange={handleChange("witness1Name")}
                    onlyLetters
                    required
                  />
                  <TextAreaField
                    label="Address & Details"
                    name="witness1Address"
                    placeholder="Complete address and contact details"
                    value={formData.witness1Address}
                    onChange={handleChange("witness1Address")}
                    minLength={10}
                    required
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800"></div>
                </div>
              </div>

              {/* Witness 2 */}
              <div>
                <h3 className="text-white font-semibold mb-4">Witness 2</h3>
                <div className="space-y-4">
                  <TextInputField
                    label="Name"
                    name="witness2Name"
                    value={formData.witness2Name}
                    onChange={handleChange("witness2Name")}
                    onlyLetters
                    required
                  />
                  <TextAreaField
                    label="Address & Details"
                    name="witness2Address"
                    placeholder="Complete address and contact details"
                    value={formData.witness2Address}
                    onChange={handleChange("witness2Address")}
                    minLength={10}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-orange-500/50 transition-all flex items-center justify-center gap-3 text-lg"
          >
            <Eye className="w-5 h-5" />
            Preview Industrial Lease Deed
          </motion.button>

          <p className="text-center text-sm text-slate-500 mt-4">
            All information will be validated before generating the final lease agreement
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default IndustrialLeaseDeedForm;