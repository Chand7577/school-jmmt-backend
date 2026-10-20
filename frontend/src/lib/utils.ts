type ClassValue = string | number | boolean | undefined | null | { [key: string]: boolean | undefined | null } | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const result: string[] = [];

  const process = (val: ClassValue) => {
    if (!val) return;
    if (typeof val === "string" || typeof val === "number") {
      result.push(String(val));
    } else if (Array.isArray(val)) {
      val.forEach(process);
    } else if (typeof val === "object") {
      Object.entries(val).forEach(([key, bool]) => {
        if (bool) result.push(key);
      });
    }
  };

  inputs.forEach(process);
  return result.join(" ");
}
