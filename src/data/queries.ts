import { gql } from '@apollo/client';

export const QUERY_THEME_SETTINGS = gql`
query ThemeSettings {
  themeGeneralSettings {
    theme_settings {
      footerAddress
      footerCopyright
      footerLabelMenu1
      footerLabelMenu2
      footerLabelMenu3
      footerLogo {
        title
        sourceUrl
      }
      footerSocials {
        socialLink
        socialIcon {
          title
          sourceUrl
        }
      }
      privacyLink {
        ... on Page {
          title
          slug
        }
      }
      buttonRepeater {
        variant
        color
        button {
          url
          title
        }
      }
      headerLogo {
        title
        sourceUrl
      }
      headerLogoHomePage {
        title
        sourceUrl
      }
      formsSettings {
        formName
        formId
        fields {
          fieldId
          name
        }
      }
    }
  }
}`;
