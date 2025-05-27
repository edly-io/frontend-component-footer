import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { ensureConfig } from '@edx/frontend-platform/config';
import { AppContext } from '@edx/frontend-platform/react';

import messages from './Footer.messages';
import LanguageSelector from './LanguageSelector';
import tutorLogo from '../assets/images/tutor-logo.png';
import openEdxLogo from '../assets/images/openedx-logo.png';

ensureConfig([
  'LMS_BASE_URL',
  'LOGO_TRADEMARK_URL',
], 'Footer component');

const EVENT_NAMES = {
  FOOTER_LINK: 'edx.bi.footer.link',
};

class SiteFooter extends React.Component {
  constructor(props) {
    super(props);
    this.externalLinkClickHandler = this.externalLinkClickHandler.bind(this);
  }

  externalLinkClickHandler(event) {
    const label = event.currentTarget.getAttribute('href');
    const eventName = EVENT_NAMES.FOOTER_LINK;
    const properties = {
      category: 'outbound_link',
      label,
    };
    sendTrackEvent(eventName, properties);
  }

  render() {
    const {
      supportedLanguages,
      onLanguageSelected,
      logo,
      intl,
    } = this.props;
    const showLanguageSelector = supportedLanguages.length > 0 && onLanguageSelected;
    const { config } = this.context;

    return (
      <div className="wrapper wrapper-footer">
        <footer id="footer" className="tutor-container">
          <div className="footer-top">
            <div className="powered-area">
              <ul className="logo-list">
                <li>Powered by:</li>
                <li>
                  <a
                    href="https://docs.tutor.edly.io"
                    rel="noopener"
                    target="_blank"
                    onClick={this.externalLinkClickHandler}
                  >
                    <img
                      src={tutorLogo}
                      alt="Runs on Tutor"
                      width="57"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://open.edx.org"
                    rel="noopener"
                    target="_blank"
                    onClick={this.externalLinkClickHandler}
                  >
                    <img
                      src={openEdxLogo}
                      alt="Powered by Open edX"
                      width="79"
                    />
                  </a>
                </li>
              </ul>
            </div>

            <nav className="nav-colophon" aria-label="About">
              <ol>
                <li><a href="/about">About Us</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/donate">Donate</a></li>
                <li><a href="/tos">Terms of Service</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/help">Help</a></li>
                <li><a href="/contact">Contact Us</a></li>
              </ol>
            </nav>
          </div>

          <span className="copyright-site">
            {`Copyrights ©${new Date().getFullYear()}. All Rights Reserved.`}
          </span>

          {showLanguageSelector && (
            <div className="language-selector-footer">
              <LanguageSelector
                options={supportedLanguages}
                onSubmit={onLanguageSelected}
              />
            </div>
          )}
        </footer>
      </div>
    );
  }
}

SiteFooter.contextType = AppContext;

SiteFooter.propTypes = {
  intl: intlShape.isRequired,
  logo: PropTypes.string,
  onLanguageSelected: PropTypes.func,
  supportedLanguages: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
};

SiteFooter.defaultProps = {
  logo: undefined,
  onLanguageSelected: undefined,
  supportedLanguages: [],
};

export default injectIntl(SiteFooter);
export { EVENT_NAMES };
