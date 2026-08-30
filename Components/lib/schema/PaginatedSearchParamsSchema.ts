import z from "zod";

const PaginatedSearchParamsSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().default(10),
  search: z.string().optional(),
  filter: z.string().optional(),
  sort: z.string().optional(),
});

export default PaginatedSearchParamsSchema;
