import { act, renderHook } from "@testing-library/react";
import useProjectForm from "../hooks/useProjectForm";

describe("useProjectForm", () => {
  test("initializes with default values", () => {
    const { result } = renderHook(() => useProjectForm());

    expect(result.current.currentStep).toBe(0);

    expect(result.current.formData.projectName).toBe("");

    expect(result.current.formData.bankName).toBe("");

    expect(result.current.formData.hardwareDetails[0].serverType).toBe(
      "DB Server",
    );

    expect(result.current.formData.digitalChannels.mobileBanking).toBe(false);

    expect(result.current.formData.paymentSystems.rtgs).toBe(false);
  });

  test("updates current step", () => {
    const { result } = renderHook(() => useProjectForm());

    act(() => {
      result.current.setCurrentStep(3);
    });

    expect(result.current.currentStep).toBe(3);
  });

  test("updates root fields", () => {
    const { result } = renderHook(() => useProjectForm());

    act(() => {
      result.current.updateRootFields({
        projectName: "Test Project",
        bankName: "HDFC",
      });
    });

    expect(result.current.formData.projectName).toBe("Test Project");

    expect(result.current.formData.bankName).toBe("HDFC");
  });

  test("preserves existing root values", () => {
    const { result } = renderHook(() => useProjectForm());

    act(() => {
      result.current.updateRootFields({
        projectName: "Project A",
      });
    });

    act(() => {
      result.current.updateRootFields({
        bankName: "SBI",
      });
    });

    expect(result.current.formData.projectName).toBe("Project A");

    expect(result.current.formData.bankName).toBe("SBI");
  });

  test("updates contactDetails section", () => {
    const { result } = renderHook(() => useProjectForm());

    act(() => {
      result.current.updateSection("contactDetails", {
        chairman: {
          name: "Sachin",
          contactNumber: "1234567890",
        },
      });
    });

    expect(result.current.formData.contactDetails.chairman.name).toBe("Sachin");
  });

  test("updates cbsInformation section", () => {
    const { result } = renderHook(() => useProjectForm());

    act(() => {
      result.current.updateSection("cbsInformation", {
        previousCBSVendor: "TCS",
      });
    });

    expect(result.current.formData.cbsInformation.previousCBSVendor).toBe(
      "TCS",
    );
  });

  test("merges section values", () => {
    const { result } = renderHook(() => useProjectForm());

    act(() => {
      result.current.updateSection("cbsInformation", {
        previousCBSVendor: "TCS",
      });
    });

    act(() => {
      result.current.updateSection("cbsInformation", {
        existingCBSVendor: "Infosys",
      });
    });

    expect(result.current.formData.cbsInformation.previousCBSVendor).toBe(
      "TCS",
    );

    expect(result.current.formData.cbsInformation.existingCBSVendor).toBe(
      "Infosys",
    );
  });

  test("updates hardwareDetails array", () => {
    const { result } = renderHook(() => useProjectForm());

    const updatedArray = [
      {
        serverType: "App Server",
        units: "2",
        diskSpaceGb: "500",
        ramGb: "32",
        cores: "8",
      },
    ];

    act(() => {
      result.current.updateArraySection("hardwareDetails", updatedArray);
    });

    expect(result.current.formData.hardwareDetails).toEqual(updatedArray);
  });

  test("updates digital channels section", () => {
    const { result } = renderHook(() => useProjectForm());

    act(() => {
      result.current.updateSection("digitalChannels", {
        mobileBanking: true,
      });
    });

    expect(result.current.formData.digitalChannels.mobileBanking).toBe(true);
  });

  test("updates payment systems section", () => {
    const { result } = renderHook(() => useProjectForm());

    act(() => {
      result.current.updateSection("paymentSystems", {
        rtgs: true,
      });
    });

    expect(result.current.formData.paymentSystems.rtgs).toBe(true);
  });

  test("resetForm resets all values", () => {
    const { result } = renderHook(() => useProjectForm());

    act(() => {
      result.current.setCurrentStep(4);

      result.current.updateRootFields({
        projectName: "My Project",
      });
    });

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.currentStep).toBe(0);

    expect(result.current.formData.projectName).toBe("");

    expect(result.current.formData.bankName).toBe("");

    expect(result.current.formData.hardwareDetails[0].serverType).toBe(
      "DB Server",
    );
  });
});
