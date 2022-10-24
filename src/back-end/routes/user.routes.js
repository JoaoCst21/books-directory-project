import app from "../framework/framework.js";

const router = app.createRouter();

const controller = (req, res) => res.end("chainable user working too");
router.route("/").get(controller).post(controller);

router
  .route("/:id")
  .put(controller)
  .delete(controller)
  .get((req, res) => {
    res.end("get one user");
  });
export default router;
