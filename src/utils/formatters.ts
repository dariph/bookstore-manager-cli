export function formatarDataBR(data: Date | string | null): string | null {
  if (!data) return null;
  return new Date(data).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
}
