// src/styles/templates/creativeBlueStyles.js
import makeStylesWithTheme from '../makeStylesAdapter';

const useCreativeBlueStyles = makeStylesWithTheme((theme) => ({
  resumeHeader: {
    marginBottom: '2rem',
    textAlign: 'center',
    paddingBottom: '1rem',
    position: 'relative',
    backgroundColor: '#e3f2fd',
    padding: '2rem 1rem',
    borderRadius: '8px',
  },
  // Add other styles similar to professionalStyles but with blue theme
  // This is a basic example - expand as needed
}));

export default useCreativeBlueStyles;