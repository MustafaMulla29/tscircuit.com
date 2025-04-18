import { withRouteSpec } from "fake-snippets-api/lib/middleware/with-winter-spec"
import { z } from "zod"

export default withRouteSpec({
  methods: ["POST"],
  auth: "session",
  jsonBody: z.object({
    package_release_id: z.string(),
    vendor_name: z.string(),
  }),
  jsonResponse: z.object({
    order_quote_id: z.string(),
  }),
})(async (req, ctx) => {
  const { package_release_id, vendor_name } = req.jsonBody

  const orderQuoteId = ctx.db.addOrderQuote({
    account_id: ctx.auth.account_id,
    package_release_id,
    vendor_name,
  })

  return ctx.json({
    order_quote_id: orderQuoteId,
  })
})
