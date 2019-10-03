type ModeValues = 'dev' | 'prod'

interface Window {
  $mode: ModeValues;
}
