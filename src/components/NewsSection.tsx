import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const NewsSection = () => {
  return (
    <div className="bg-gradient-to-b from-[#1a1f2c] to-[#151821] text-white py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-8">
          <section className="bg-gradient-to-br from-[#1e2430] to-[#252b3b] p-8 rounded-xl shadow-lg border border-[#2a3040]">
            <h3 className="text-2xl font-semibold text-[#4a9eed] mb-6">What we've been doing</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Brother Sajid has resigned and a new Committee was formally created. We would like to thank brother Sajid for his previous efforts, and he will continue helping the Committee where possible in an informal capacity.
            </p>
            <p className="text-gray-300 mb-6">
              New Committee, <Link to="/terms" className="text-[#4a9eed] hover:text-[#3a8edd]">terms and conditions</Link>, and registration, <Link to="/collector-responsibilities" className="text-[#4a9eed] hover:text-[#3a8edd]">formalise roles for Collectors Responsibilities</Link>
            </p>
            <div className="mt-6">
              <h4 className="text-xl font-semibold mb-4 text-[#4a9eed]">New Committee as of December 2023</h4>
              <ul className="list-none space-y-3 text-gray-300">
                <li className="flex items-center space-x-2">
                  <span className="text-[#4a9eed]">•</span>
                  <span>Chairperson: Anjum Riaz & Habib Mushtaq</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#4a9eed]">•</span>
                  <span>Secretary: Tariq Majid</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#4a9eed]">•</span>
                  <span>Treasurer: Faizan Qadiri</span>
                </li>
              </ul>
              <p className="text-gray-300 mt-4">Terms have been updated.</p>
            </div>
          </section>
          <section className="bg-gradient-to-br from-[#1e2430] to-[#252b3b] p-8 rounded-xl shadow-lg border border-[#2a3040]">
            <h3 className="text-2xl font-semibold text-[#4a9eed] mb-6">What we expect</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start space-x-3">
                <span className="text-[#4a9eed] mt-1">•</span>
                <span>All members have been given membership numbers. Please contact your collector to find this out.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#4a9eed] mt-1">•</span>
                <span>Please login individually and fill in required data.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#4a9eed] mt-1">•</span>
                <span>We expect timely payments that are up to date.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#4a9eed] mt-1">•</span>
                <span>Collectors who are timely and up to date, thank you, and please continue with your efforts.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#4a9eed] mt-1">•</span>
                <span>Those not up to date, please find out your membership number from your collector, then please login online and make payment as soon as possible.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#4a9eed] mt-1">•</span>
                <span>If payments are not up to date then you will not be covered.</span>
              </li>
            </ul>
          </section>

          <section className="bg-gradient-to-br from-[#1e2430] to-[#252b3b] p-8 rounded-xl shadow-lg border border-[#2a3040]">
            <h3 className="text-2xl font-semibold text-[#4a9eed] mb-6">Important Information</h3>
            <div className="text-gray-300 space-y-4">
              <p>Trialled so far online payment using Stripe - not enough uptake, sidelined for possible future use.</p>
              <p>Check with your collector if payments up to date, if not up to date YOU ARE NOT COVERED! The responsibility to pay is on the member, not the Collector.</p>
              <p>Unfortunately we are not taking on new members. So if Collectors are in arrears, they will be given deadlines to clear arrears. After this deadline you will no longer be considered to be a member of Pakistan Welfare Committee, and currently we are not taking any more members on so you will be advised to join another Committee if they are willing to take new members.</p>
              <p>Only members who become of age will be added as new members.</p>
              <p>We humbly request everyone keeps their payments up to date, the best method is to pay directly here.</p>
              <p>If there are members in the community that feel they can assist in a voluntary capacity to improve aspects of the processes involved, please get in touch with the Committee.</p>
            </div>
          </section>

          <section className="bg-gradient-to-br from-[#1e2430] to-[#252b3b] p-8 rounded-xl shadow-lg border border-[#2a3040]">
            <h3 className="text-2xl font-semibold text-[#4a9eed] mb-6">Medical Examiner Process</h3>
            <div className="text-gray-300 space-y-4">
              <p>To understand our comprehensive Medical Examiner Death Certification process, please review our detailed Medical Examiner Flow Chart.</p>
              <p>This flow chart provides a step-by-step guide to the death certification process, ensuring transparency and clarity for all members.</p>
              <Button variant="default" className="bg-gradient-to-r from-[#4a9eed] to-[#3a8edd] hover:from-[#3a8edd] hover:to-[#2a7ecd] mt-4">
                View Flow Chart
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
