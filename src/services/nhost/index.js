import { onInitService } from "./on-init-service";
import { NHostWrapper } from "./NHostWrapper";

const nhostService = () => [
  {
    target: "$INIT_SERVICE",
    handler: onInitService
  },
  {
    target: "$REACT_ROOT_WRAPPER",
    handler: { component: NHostWrapper }
  }
];

export default nhostService;
