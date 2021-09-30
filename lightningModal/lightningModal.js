/**
 * c-lightning-modal component global properties
 * @modalId = This is to make modal a unique identity
 * @hideHeader = Make this property true to hide header
 * @hideFooter = Make this property true to hide footer
 * @width = add custom width to the modal in px
 * @size  = send these value ["small", "medium", "large"] to size property
 * @title = send the static string to header using this property
 * @tagline slot - use this slot to send the tagline content
 * @title slot - use this slot to send the custom header content
 * @footer slot - use this slot to send the custom footer content
 * @showModal Method - use this method on parent component to show modal
 * @hideModal Method - use this method on parent component to hide modal
 */
 /**
  * *********** Usage *******************
 * 
 * <c-lightning-modal title="modal header" size="medium" modal-id="modal1">
 *  <div>Modal Body</div>
 *  <div slot="footer">
 *  <lightning-button variant="neutral" label="Cancel" title="Cancel" class="slds-var-m-left_x-small"></lightning-button>
 *   <lightning-button variant="brand" label="Save" title="Save" class="slds-var-m-left_x-small"></lightning-button>
 *  </div>
 * </c-lightning-modal>
 * 
 * *************To Show Modal*********************
 * this.template.querySelector(`c-lightning-modal`).showModal()
 * 
  * *************To hide Modal*********************
 * this.template.querySelector(`c-lightning-modal`).hideModal()
 */

import { LightningElement, api } from 'lwc';
const CSS_CLASS = 'slds-hide';

export default class LightningModal extends LightningElement {
  /***Private Properties */
  _showModal = false;
  _title;

  /***Private Getters ***/
  get ariaDescribedbyId(){
    return `modal-content-id-${this.modalId}`
  }

  get modalSize(){
      let size = this.size ? this.size.toLowerCase():''
      return `slds-modal slds-fade-in-open ${this.className? this.className:''} ${size?`slds-modal_${size}`:''}`
  }
  get customWith(){
    return `width:${this.width}px`
  }
  /***Global Properties ***/
  @api modalId = 'modal-heading-01'
  @api hideHeader = false
  @api hideFooter = false
  @api size // ["small", "medium", "large"]
  @api width

  /***@header is a global property that will recieve title value as string in setter if it get passed to the modal */
  @api
  set title(value) {
        this._title = value;
  }
  get title() {
      return this._title;
  }

  /***@showModal is a global method that will show the modal */
  @api showModal() {
    this._showModal = true;
  }
  /***@hideModal is a global method that will hide the modal */
  @api hideModal() {
      this._showModal = false;
  }

  /***@closeModalHandler is a let know the parent that modal close icon has been called clicked and modal is closed*/
    closeModalHandler() {
      this.dispatchEvent(new CustomEvent('close'));
      this.hideModal();
  }

  /***@taglineSlotHandler is a method that get called when the tagline slot recieve the content*/
  taglineSlotHandler() {
      if (this._showModal) {
        const taglineEl = this.template.querySelector('.tagline');
        taglineEl.classList.remove(CSS_CLASS);
      }
      
  }
  /***@footerSlotHandler is a method that get called when the footer slot recieve the content*/
  footerSlotHandler() {
      if (this._showModal) {
        const footerEl = this.template.querySelector('footer');
        footerEl.classList.remove(CSS_CLASS);
      }
      
  }
}