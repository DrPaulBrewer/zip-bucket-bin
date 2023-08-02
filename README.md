# zip-bucket-bin

The *zip-bucket-bin* module contains only the `zip-bucket` command line program.

npm may also install the *zip-bucket* library module as a dependency.

## Command Line Program `zip-bucket`

Creates a .zip archive from a collection of files in a Google Cloud Storage[tm] bucket.
You can keep the resulting .zip file locally, upload back to Google Cloud Storage, or both.

### Installation

For global installation of the command line program, so that all users can use `zip-bucket`:

    sudo npm install -g zip-bucket-bin

### Usage

Enter `zip-bucket --help` to print this reminder message:

<pre>

  Usage: zip-bucket [options] fromBucketPath [toBucketPath]

  Options:

    -h, --help       output usage information
    -V, --version    output the version number
    --key <keyfile>  keyfile to access Google Cloud Storage API
    --keep <keep>    path in local filesystem to keep a copy of the .zip file
    --progress       show progress messages
    --json           output parameters and manifest in json at program completion

</pre>

`<fromBucketPath>` has the format `gs://bucketName/path`

`<toBucketPath>` needs to include the zip file name, e.g. `gs://bucketName/some/other/path/myzipfile.zip`

### Examples

#### Example #1

Goal: zip up the files found at gs://my-bucket/2016 to another bucket gs://backup-bucket/my2016.zip, show progress messages (not shown)

    $ zip-bucket --progress --key /path/to/secret/key.json gs://my-bucket/2016 gs://backup-bucket/my2016.zip

#### Example #2

Goal: zip up the files found at gs://my-bucket/20170402T0616/U to a local file /tmp/sims2.zip and output the manifest (and parameters) in JSON

    $ zip-bucket --json --key /path/to/secret/key.json --keep /tmp/sims2.zip gs://my-bucket/20170402T0616/U/
                 {
		     "keep": "/tmp/sims2.zip",
		     "fromBucket": "my-bucket",
		     "fromPath": "20170402T0616/U/",
		     "manifest": [
			 [
			     "20170402T0616/U/effalloc.csv",
			     "U/effalloc.csv"
			 ],
			 [
			     "20170402T0616/U/md5.json",
			     "U/md5.json"
			 ],
			 [
			     "20170402T0616/U/ohlc.csv",
			     "U/ohlc.csv"
			 ],
			 [
			     "20170402T0616/U/profit.csv",
			     "U/profit.csv"
			 ],
			 [
			     "20170402T0616/U/sim.json",
			     "U/sim.json"
			 ],
			 [
			     "20170402T0616/U/trade.csv",
			     "U/trade.csv"
			 ],
			 [
			     "20170402T0616/U/volume.csv",
			     "U/volume.csv"
			 ]
		     ]
		 }



## Google Cloud Charges

Keep in mind that running this software outside of Google Cloud will result in bandwidth fees. To save money,
you should probably find a way to run it from within Google Cloud.

Note:  All Google service fees are your responsibility, as the user of this software, and under the MIT License there is
a disclaimer of liability for any defects in this software.

## Copyright

Copyright 2017 Paul Brewer, Economic and Financial Technology Consulting LLC <drpaulbrewer@eaftc.com> and Contributors

## Contributions

@atlanteh Windows compatibility, downloadValidation flag, v1.0 based on streaming

@harscoet Patch for issue with bin.js, move bin.js dependencies to "dependencies"

## License

The MIT License

### Trademarks

Google Cloud Storage[tm] is a trademark of Google, Inc.

This software is not a product of Google, Inc.




