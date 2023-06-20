export const GET = async (req: NextRequest, res: IResponse) => {
  const session = await getSession(req, res);
  const { subjectname } = req.query; // Only get subjectname from query parameters

  try {
    await dbConnect();

    // ... rest of the pipeline_1 and pipeline_2 code ...

    const data = await Topic.aggregate([
      { $match: { subject: subjectname } }, // assuming "subject" is the relevant field in your data
      {
        $facet: {
          topics: [
            ...pipeline_1,
            {
              $project: {
                _id: 1,
                title: 1,
                mini_description: 1,
                isLiked: {
                  $cond: {
                    if: "$isLiked",
                    then: "$isLiked",
                    else: false,
                  },
                },
                isBookmarked: {
                  $cond: {
                    if: "$isBookmarked",
                    then: "$isBookmarked",
                    else: false,
                  },
                },
              },
            },
          ],
          total_topics: [{ $match: { subject: subjectname } }, { $count: "totalCount" }], // filter total count by subjectname as well
        },
      },
    ]);

    // ... rest of the response handling code ...
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ error: true, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};
