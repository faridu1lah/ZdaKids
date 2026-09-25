# Authentication module boundary

Authentication will live here when parent accounts are introduced. Keep guards,
strategies, decorators, and token handling inside this module; feature modules
should depend on an authenticated parent identity, not on a specific auth vendor.
