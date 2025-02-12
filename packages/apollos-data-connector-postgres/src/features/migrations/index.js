import CreateFeatures001 from './001_create_features';
import UniqueIndexForFeatures002 from './002_unique_index_for_features';
import RenameFeatureFields003 from './003_rename_feature_fields';
import AddFeaturePriorityField004 from './004_add_feature_priority_field';
import UpdateFeaturesUniqueIndex005 from './005_update_features_unique_index';

const migrations = [
  CreateFeatures001,
  UniqueIndexForFeatures002,
  RenameFeatureFields003,
  AddFeaturePriorityField004,
  UpdateFeaturesUniqueIndex005,
];

export default migrations;
