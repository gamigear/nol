import { fallbackTemplateData, type TemplateData } from "./template-data";

type MedusaTemplateResponse = {
  data?: Partial<TemplateData>;
};

function mergeTemplateData(data?: Partial<TemplateData>): TemplateData {
  const backendData = Object.fromEntries(
    Object.entries(data ?? {}).filter(([, value]) => Array.isArray(value) ? value.length > 0 : Boolean(value) && typeof value === "object")
  );

  return {
    ...fallbackTemplateData,
    ...backendData,
  } as TemplateData;
}

export async function getTemplateData(): Promise<TemplateData> {
  const baseUrl = process.env.MEDUSA_BACKEND_URL;
  if (!baseUrl) {
    return fallbackTemplateData;
  }

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/nol-template-data`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Medusa template API returned ${response.status}`);
    }

    const payload = (await response.json()) as MedusaTemplateResponse;
    return mergeTemplateData(payload.data);
  } catch (error) {
    console.warn("Falling back to local ticket template data", error);
    return fallbackTemplateData;
  }
}
