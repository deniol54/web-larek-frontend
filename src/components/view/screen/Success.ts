import { SuccessData, SuccessSettings } from "../../../types/view/Screen/Success";
import { Screen } from "../../base/screen";
import { ModalView } from "../common/Modal";
import { HeaderData } from "../../../types/view/Common/Header";
import { settings } from "../../../utils/constants";
import { HeaderView} from "../common/Header";
import { cloneTemplate } from "../../../utils/html";

export class SuccessScreen extends Screen<SuccessData, SuccessSettings> {
	protected declare modal: ModalView<HeaderData>;

	init() {
		this.modal = new ModalView<HeaderData>(
			cloneTemplate(settings.modalTemplate),
			{
				...settings.modalSettings,
				contentView: new HeaderView(cloneTemplate(settings.messageTemplate), {
					...settings.messageSettings,
					onClick: this.settings.onClose,
				}),
				onClose: this.settings.onClose,
				actions: [],
			}
		);

		this.element = this.modal.element;
	}

	set content(value: HeaderData) {
		this.modal.content = value;
	}

	set isActive(value: boolean) {
		this.modal.isActive = value;
	}
}